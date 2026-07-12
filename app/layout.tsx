import SonnerToaster from "@/components/SonnerToaster/SonnerToaster";
import type { Metadata } from "next";
import "react-international-phone/style.css";
import "./globals.css";
import { GoogleMapsProvider } from "@/store/googleProvider";

export const metadata: Metadata = {
  title: "DeliGo Fleet Manager Portal | Manage Drivers & Operations",
  description:
    "DeliGo Fleet Manager Portal enables delivery fleet partners to manage Drivers,  track performance, monitor payouts, and streamline delivery operations from a powerful dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GoogleMapsProvider>
          {children}
          <SonnerToaster />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
