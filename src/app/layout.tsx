'use client'
import localFont from "next/font/local";
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname() ?? "/";
  const router = useRouter();


  useEffect(() => {
    // Skip redirect for auth pages and public routes
    const isAuthPage =
      pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isPublicApi =
      pathname.startsWith("/api/tracking_webhook") ||
      pathname.startsWith("/api/wallet/webhooks") ||
      pathname.startsWith("/api/shopify/orderUpdate");

    if (isLoaded && !isSignedIn && !isAuthPage && !isPublicApi) {
      const currentUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?redirect=${currentUrl}`);
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
