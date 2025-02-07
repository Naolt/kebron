import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";

//const poppins = Poppins({
//  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//  subsets: ["latin"],
//});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased light`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
