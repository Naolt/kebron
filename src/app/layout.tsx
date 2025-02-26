import AuthProvider from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { Roboto, Noto_Sans_Ethiopic } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { BackToTop } from "@/components/back-to-top";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const notoEthiopic = Noto_Sans_Ethiopic({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["ethiopic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    default: "Kebron International Church",
    template: "%s | Kebron International Church",
  },
  description:
    "A vibrant, faith-filled community in Germany where people from different backgrounds come together to worship, study the Word, and serve one another.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Kebron International Church",
    images: [
      {
        url: "/home/hero5.JPG", // We'll need to create this
        width: 1200,
        height: 630,
        alt: "Kebron International Church",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} ${notoEthiopic.className} antialiased light`}
      >
        <AuthProvider>
          {children}
          <BackToTop />
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
