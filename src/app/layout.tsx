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
  title: "Kebron International Church",
  description: "Kebron International Church",
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
