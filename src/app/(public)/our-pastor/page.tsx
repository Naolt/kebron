import React from "react";
import PastorHero from "../../_components/OurPastor/pastor-hero";
import PastorStory from "../../_components/OurPastor/pastor-story";
import { Contact } from "@/models/contact";
import { getContactServer } from "@/actions/action";
import { Metadata } from "next";

export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

async function OurPastorPage() {
  const contact: Contact = await getContactServer();

  if (!contact) {
    return (
      <div className="w-full">
        <PastorHero />
      </div>
    );
  }

  return (
    <div className="w-full">
      <PastorHero />
      <PastorStory contact={contact} />
    </div>
  );
}

export default OurPastorPage;

export const metadata: Metadata = {
  title: "Meet Our Pastor - Wondwossen Tadesse",
  description:
    "Pastor Wondwossen Tadesse leads Kebron International Church with vision and dedication. From Ethiopia to Germany, discover his journey of faith, leadership, and service to God's people.",
  keywords:
    "Pastor Wondwossen Tadesse, church leader, spiritual guidance, christian leadership, Kebron pastor",
  openGraph: {
    title: "Meet Pastor Wondwossen Tadesse",
    description: "A journey of faith, leadership, and service",
    images: [{ url: "/teams/Wond2.JPG" }],
  },
};
