import React from "react";
import MinistryHero from "../../_components/Ministries/ministry-hero";
import OurMinistries from "../../_components/Ministries/our-ministries";
//import WhatWeDo from "../../_components/Ministries/what-we-do";
import JoinUs from "../../_components/Ministries/Join-us";
import Ministries from "@/app/_components/Ministries/ministries";

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
