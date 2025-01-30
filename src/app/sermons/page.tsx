import React from "react";
import SermonsHero from "../_components/Sermons/sermons-hero";
import OurSermons from "../_components/Sermons/our-sermons";
import OurWebinars from "../_components/Sermons/our-webinars";
import JoinUs from "../_components/Sermons/join-us";

function SermonsPage() {
  return (
    <div className="w-full">
      <SermonsHero />
      <OurSermons />
      <OurWebinars />
      <JoinUs />
    </div>
  );
}

export default SermonsPage;
