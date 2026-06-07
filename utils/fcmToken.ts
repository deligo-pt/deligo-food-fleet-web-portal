/* eslint-disable @typescript-eslint/no-explicit-any */
import { messaging } from "@/config/firebase";
import { getToken } from "firebase/messaging";
import { getDeviceInfo } from "./getDeviceInfo";
import { cleanupFirebaseDatabases } from "./firebaseDBCleanup";

// let isCleaning = false;

export async function getFcmToken(): Promise<string | null> {
  if (!messaging) return null;
  if (!("serviceWorker" in navigator)) return null;

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return null;

    // Important: Let Firebase handle service worker registration automatically
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
      // Do NOT pass serviceWorkerRegistration unless you have a custom SW
    });

    return token;
  } catch (error: any) {
    console.warn("FCM getToken failed:", error);

    const isVersionError =
      error.name === "VersionError" ||
      error.message?.toLowerCase().includes("version") ||
      error.message?.includes("less than the existing version");

    // if (isVersionError && !isCleaning) {
    //   isCleaning = true;
    //   console.log("[FCM] Version conflict detected. Cleaning IndexedDB...");

    //   cleanupFirebaseDatabases();

    //   // Wait a bit for deletion to complete
    //   await new Promise((resolve) => setTimeout(resolve, 800));

    //   try {
    //     // Retry once
    //     const retryToken = await getToken(messaging, {
    //       vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
    //     });
    //     console.log("[FCM] Retry successful");
    //     isCleaning = false;
    //     return retryToken;
    //   } catch (retryErr) {
    //     console.error("[FCM] Retry also failed:", retryErr);
    //   }
    //   isCleaning = false;
    // }

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
