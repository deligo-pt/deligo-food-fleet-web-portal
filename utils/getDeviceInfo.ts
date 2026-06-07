import { DEVICE_KEY } from "@/consts/device.const";
import Cookies from "js-cookie";
import { UAParser } from "ua-parser-js";
import { v4 as uuidv4 } from "uuid";
import { getFcmToken } from "./fcmToken";

export const getDeviceInfo = async () => {
  const parser = new UAParser();
  const result = parser.getResult();

  let fcmToken: string | null = null;

  try {
    // Add timeout to prevent hanging forever
    fcmToken = await Promise.race([
      getFcmToken(),
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("FCM timeout")), 4000)
      )
    ]);
  } catch (err) {
    console.warn("FCM token acquisition failed or timed out:", err);
    fcmToken = null;
  }

  let deviceId = Cookies.get(DEVICE_KEY);

  if (!deviceId) {
    deviceId = uuidv4();
    Cookies.set(DEVICE_KEY, deviceId, { expires: 365 });
  }

  return {
    deviceId,
    deviceType: "browser",
    deviceName: `${result.browser.name || 'Unknown'} ${result.browser.version || ''}`,
    fcmToken: fcmToken || "",
    isLoggedIn: true,
    userAgent: navigator.userAgent,
  };
};
