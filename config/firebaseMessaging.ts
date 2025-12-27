// firebaseMessaging.ts
import { getMessaging, Messaging } from "firebase/messaging";
import { app } from "./firebase";

export const messaging: Messaging | null =
  typeof window !== "undefined" ? getMessaging(app) : null;
