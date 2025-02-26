import React from "react";
import AboutHero from "../../_components/About/about-hero";
import OurStory from "../../_components/About/our-story";
import OurCoreValues from "../../_components/About/our-core-values";
import OurTeam from "../../_components/About/our-team";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Founded in 2019, Kebron International Church is a faith community in Rüsselsheim that welcomes people from all backgrounds. Learn about our journey, mission, and the dedicated team serving our congregation.",
  keywords:
    "about Kebron church, church history, church mission, christian values, church team",
  openGraph: {
    title: "About Kebron International Church",
    description: "Learn about our history, mission, and values",
    images: [{ url: "/home/hero5.JPG" }],
  },
};
