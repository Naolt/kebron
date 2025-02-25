import React from "react";
import AboutHero from "../../_components/About/about-hero";
import OurStory from "../../_components/About/our-story";
import OurCoreValues from "../../_components/About/our-core-values";
import OurTeam from "../../_components/About/our-team";

export default function AboutPage() {
  return (
    <div className="w-full">
      <AboutHero />
      <OurStory />
      <OurCoreValues />
      <OurTeam />
    </div>
  );
}
