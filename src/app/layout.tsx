import AuthProvider from "@/components/providers/session-provider";
import { Toaster } from "@/components/ui/sonner";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
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
      <body className={`${roboto.className} antialiased light`}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
