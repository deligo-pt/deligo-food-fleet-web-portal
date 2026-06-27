import { USER_ROLE, USER_STATUS } from "@/consts/user.const";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/verifyJWT";
import { getNewAccessToken } from "./utils/getNewAccessToken";

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
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);

  let decodedData = null;
  let isTokenRefreshed = false;
  let newAccessTokenValue = "";

  // === Token Verification & Silent Refresh ===
  if (accessToken) {
    const decoded = await verifyJWT(accessToken);

    if (decoded.success) {
      decodedData = decoded.data;
    } else if (decoded?.reason === "jwt expired" && refreshToken) {
      const newAccessTokenResponse = await getNewAccessToken();
      const newAccessToken =
        typeof newAccessTokenResponse === "string"
          ? newAccessTokenResponse
          : newAccessTokenResponse?.accessToken;

      if (newAccessToken) {
        const verified = await verifyJWT(newAccessToken);
        if (verified.success) {
          decodedData = verified.data;
          newAccessTokenValue = newAccessToken;
          isTokenRefreshed = true;
        }
      }
    }
  }

  if (!decodedData) {
    if (PUBLIC_AUTH_PATHS.some((path) => pathname === path || pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // Protect vendor and registration routes
    if (pathname.startsWith("/agent") || PROTECTED_REGISTRATION_PATHS.some((p) => pathname.startsWith(p))) {
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }
    return NextResponse.next();
  }

  const { role, status } = decodedData;

  // Helper helper to create responses that preserve the refreshed cookie state if needed
  const createResponse = (redirectUrl?: URL) => {
    const res = redirectUrl ? NextResponse.redirect(redirectUrl) : NextResponse.next();
    if (isTokenRefreshed && newAccessTokenValue) {
      res.cookies.set({
        name: "accessToken",
        value: newAccessTokenValue,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    }
    return res;
  };

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
    return createResponse();
  }

  // Block incomplete users from agent dashboard
  if (pathname.startsWith("/agent") && status !== USER_STATUS.APPROVED) {
    return NextResponse.redirect(new URL("/become-agent/registration-status", req.url));
  }

  // Allow protected registration paths only if status is valid
  if (PROTECTED_REGISTRATION_PATHS.some(p => pathname.startsWith(p))) {
    if (status === USER_STATUS.APPROVED) {
      return createResponse(new URL("/agent/dashboard", req.url));
    } else if (status === USER_STATUS.PENDING) {
      return createResponse();
    } else {
      if (pathname === "/become-agent/registration-status") {
        return createResponse();
      } else {
        return createResponse(new URL("/become-agent/registration-status", req.url));
      }
    }
  }

  return createResponse();
}

export const config = {
  matcher: [
    "/login",
    "/become-agent/:path*",
    "/agent/:path*",
  ],
};