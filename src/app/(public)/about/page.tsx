import React from "react";
import AboutHero from "../../_components/About/about-hero";
import OurStory from "../../_components/About/our-story";
import OurStoryTwo from "../../_components/About/our-story-two";
import OurTeam from "../../_components/About/our-team";

function AboutPage() {
  return (
    <div className="w-full">
      <AboutHero />
      <OurStory />
      <OurStoryTwo />
      <OurTeam />
    </div>
  );
}

export default AboutPage;
