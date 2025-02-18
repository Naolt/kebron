import type { Metadata } from "next";
import Header from "../_components/MainLayout/header";
import Footer from "../_components/MainLayout/footer";

export const metadata: Metadata = {
  title: "Kebron International Church",
  description: "Kebron International Church",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
