/* eslint-disable @typescript-eslint/no-explicit-any */
import { messaging } from "@/config/firebase";
import { getToken } from "firebase/messaging";
import { getDeviceInfo } from "./getDeviceInfo";
import { cleanupFirebaseDatabases } from "./firebaseDBCleanup";

let isCleaning = false;

export async function getFcmToken(): Promise<string | null> {
  if (!messaging || !("serviceWorker" in navigator)) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted");
      return null;
    }

    // Add timeout to prevent infinite hang
    const tokenPromise = getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    });

    const token = await Promise.race([
      tokenPromise,
      new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error("getToken timeout")), 6000)
      )
    ]);

    return token || null;
  } catch (error: any) {
    console.warn("FCM getToken failed:", error);

    const isVersionError = error.name === "VersionError" ||
      error.message?.toLowerCase().includes("version");

    if (isVersionError && !isCleaning) {
      isCleaning = true;
      console.warn("[FCM] Version conflict detected. Running cleanup...");

      try {
        await cleanupFirebaseDatabases();
        await new Promise((r) => setTimeout(r, 1500)); // longer delay

        // Retry with timeout
        const retryToken = await Promise.race([
          getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY! }),
          new Promise<null>((_, reject) => setTimeout(() => reject(new Error("Retry timeout")), 8000))
        ]);

        console.log("[FCM] Recovery successful");
        isCleaning = false;
        return retryToken || null;
      } catch (retryErr) {
        console.error("[FCM] Cleanup + retry failed:", retryErr);
      } finally {
        isCleaning = false;
      }
    }

    return null;
  }
}

export async function updateFcmToken(
  accessToken: string,
  token: string,
): Promise<void> {
  try {
    const deviceInfo = await getDeviceInfo();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("API base URL is not defined");
    }

    const endpoint = `${baseUrl}/auth/update-fcm-token`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        token,
        deviceId: deviceInfo.deviceId,
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

  } catch (err) {
    console.error("updateFcmToken failed:", err);
    throw err;
  }
}

export async function getAndSaveFcmToken(accessToken: string): Promise<void> {
  try {
    const token = await getFcmToken();
    if (!token) return;

    const savedToken = localStorage.getItem("deligo-fleet-fcm-token");

    // Only hit the update API if the token is actually new
    if (token !== savedToken) {
      await updateFcmToken(accessToken, token);
      localStorage.setItem("deligo-fleet-fcm-token", token);
      console.log("FCM Token successfully updated in DB");
    }
  } catch (fcmError) {
    console.error("Failed to update FCM token:", fcmError);
  }
}
