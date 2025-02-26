import React from "react";
import Assist from "../../_components/Donate/assist";
import DonateHeroTwo from "../../_components/Donate/donate-hero-two";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate to Kebron International Church",
  description:
    "Support Kebron International Church with your generous donations. Your support helps us continue our mission to spread the love of Jesus Christ to our community.",
  openGraph: {
    title: "Donate to Kebron International Church",
    description:
      "Support Kebron International Church with your generous donations. Your support helps us continue our mission to spread the love of Jesus Christ to our community.",
    images: [{ url: "/home/hero5.JPG" }],
  },
};

function Donate() {
  return (
    <div>
      <DonateHeroTwo />
      <Assist />
    </div>
  );
}

export default Donate;
