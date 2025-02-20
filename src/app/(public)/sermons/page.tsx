import React from "react";
import SermonsHero from "../../_components/Sermons/sermons-hero";
import OurSermons from "../../_components/Sermons/our-sermons";
import JoinUs from "../../_components/Sermons/join-us";
import { Contact } from "@/models/contact";
import OurLiveStream from "../../_components/Sermons/our-livestreams";
import { getContactServer } from "@/actions/action";

// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

async function SermonsPage() {
  const contactInfo: Contact = await getContactServer();

  return (
    <div className="w-full">
      <SermonsHero />
      <OurSermons contactInfo={contactInfo} />
      <OurLiveStream contactInfo={contactInfo} />
      <JoinUs />
    </div>
  );
}
export default SermonsPage;
