import { USER_ROLE, USER_STATUS } from "@/consts/user.const";
import { getFleetManagerInfo } from "@/utils/getFleetManagerInfo";
import { verifyTokens } from "@/utils/verifyTokens";
import { NextRequest, NextResponse } from "next/server";

const AUTH_PATHS = ["/login", "/become-agent"];

export async function proxy(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  if (searchParams.has("tokenRefreshed")) {
    const url = req.nextUrl.clone();
    url.searchParams.delete("tokenRefreshed");
    return NextResponse.redirect(url);
  }

  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("redirect", pathname);

  const tokenWasRefreshed = await verifyTokens();

  if (tokenWasRefreshed) {
    const url = req.nextUrl.clone();
    url.searchParams.set("tokenRefreshed", "true");
    return NextResponse.redirect(url);
  }

  const fleetManagerResult = await getFleetManagerInfo();

  if (fleetManagerResult) {
    const fleetManagerInfo = fleetManagerResult?.fleetManager;
    if (fleetManagerInfo.role === USER_ROLE.FLEET_MANAGER) {
      if (
        AUTH_PATHS.some(
          (path) => pathname === path || pathname.startsWith(`${path}`),
        )
      ) {
        if (
          pathname === "/login" ||
          pathname === "/become-agent" ||
          pathname === "/become-agent/verify-otp"
        ) {
          if (fleetManagerInfo.status === USER_STATUS.APPROVED) {
            return NextResponse.redirect(
              new URL("/fleetManager/dashboard", req.url),
            );
          }
          return NextResponse.redirect(
            new URL("/become-agent/registration-status", req.url),
          );
        } else if (
          pathname === "/become-agent/personal-details" ||
          pathname === "/become-agent/business-details" ||
          pathname === "/become-agent/business-location" ||
          pathname === "/become-agent/bank-details" ||
          pathname === "/become-agent/document-image-details"
        ) {
          if (
            fleetManagerInfo.status === USER_STATUS.APPROVED ||
            fleetManagerInfo.status === USER_STATUS.SUBMITTED
          ) {
            return NextResponse.redirect(
              new URL("/become-agent/registration-status", req.url),
            );
          }
        }
      }
    } else {
      req.cookies.delete("accessToken");
      req.cookies.delete("refreshToken");
      return NextResponse.redirect(loginUrl);
    }
  } else {
    if (
      pathname === "/become-agent/personal-details" ||
      pathname === "/become-agent/business-details" ||
      pathname === "/become-agent/business-location" ||
      pathname === "/become-agent/bank-details" ||
      pathname === "/become-agent/document-image-details" ||
      pathname === "/become-agent/registration-status" ||
      pathname.startsWith("/agent")
    ) {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/become-agent/:path*", "/agent/:path*"],
};
