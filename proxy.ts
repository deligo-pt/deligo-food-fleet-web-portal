import { USER_ROLE, USER_STATUS } from "@/consts/user.const";
import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import type { TJwtPayload } from "./types";

const PUBLIC_AUTH_PATHS = ["/login", "/become-agent", "/become-agent/verify-otp"];
const PROTECTED_REGISTRATION_PATHS = [
  "/become-agent/personal-details",
  "/become-agent/business-details",
  "/become-agent/business-location",
  "/become-agent/bank-details",
  "/become-agent/document-image-details",
  "/become-agent/registration-status",
];

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // === SKIP FOR SERVER ACTIONS & API ROUTES ===
  if (
    req.headers.get("next-action") ||
    req.headers.get("content-type")?.includes("text/x-component") ||
    req.method === "POST"
  ) {
    return NextResponse.next();
  }

  // Handle the explicit clear session flag safely in Middleware
  if (pathname === "/login" && searchParams.get("clearSession") === "true") {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const accessToken = req.cookies.get("accessToken")?.value;
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);

  // === No Token Logic ===
  if (!accessToken) {
    // Allow public auth pages
    if (PUBLIC_AUTH_PATHS.some(path => pathname === path || pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Redirect protected routes to login
    if (pathname.startsWith("/agent") || PROTECTED_REGISTRATION_PATHS.some(p => pathname.startsWith(p))) {
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  // === Has Token → Decode ===
  let decoded: TJwtPayload | null = null;
  try {
    decoded = jwtDecode<TJwtPayload>(accessToken);
  } catch (error) {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const { role, status } = decoded;

  if (role !== USER_ROLE.FLEET_MANAGER) {
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // === Redirect Logic for Logged-in Users ===
  if (PUBLIC_AUTH_PATHS.includes(pathname)) {
    if (status === USER_STATUS.APPROVED) {
      return NextResponse.redirect(new URL("/agent/dashboard", req.url));
    }
    // if (pathname !== "/become-agent/verify-otp") {
    //   return NextResponse.redirect(new URL("/become-agent/registration-status", req.url));
    // }
  }

  // Block incomplete users from agent dashboard
  if (pathname.startsWith("/agent") && status !== USER_STATUS.APPROVED) {
    return NextResponse.redirect(new URL("/become-agent/registration-status", req.url));
  }

  // Allow protected registration paths only if status is valid
  if (PROTECTED_REGISTRATION_PATHS.some(p => pathname.startsWith(p))) {
    if (status === USER_STATUS.APPROVED) {
      return NextResponse.redirect(new URL("/agent/dashboard", req.url));
    } else if (status === USER_STATUS.PENDING) {
      return NextResponse.next();
    } else {
      if (pathname === "/become-agent/registration-status") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/become-agent/registration-status", req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/become-agent/:path*",
    "/agent/:path*",
  ],
};