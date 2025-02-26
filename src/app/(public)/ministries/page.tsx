import React from "react";
import MinistryHero from "../../_components/Ministries/ministry-hero";
import OurMinistries from "../../_components/Ministries/our-ministries";
//import WhatWeDo from "../../_components/Ministries/what-we-do";
import JoinUs from "../../_components/Ministries/Join-us";
import Ministries from "@/app/_components/Ministries/ministries";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Church Ministries",
  openGraph: {
    title: "Church Ministries",
    description: "Church Ministries",
    images: [{ url: "/home/hero5.JPG" }],
  },
};

function MinistriesPage() {
  return (
    <div className="w-full">
      <MinistryHero />
      <OurMinistries />
      <Ministries />
      {/*<WhatWeDo />*/}
      <JoinUs />
    </div>
  );
}

export default MinistriesPage;
