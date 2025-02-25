import React from "react";
import PastorHero from "../../_components/OurPastor/pastor-hero";
import PastorStory from "../../_components/OurPastor/pastor-story";
import { Contact } from "@/models/contact";
import { getContactServer } from "@/actions/action";

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
