import React from "react";
import ContactHero from "../../_components/ContactUs/contact-hero";
import ContactPerson from "../../_components/ContactUs/contact-person";
import ContactDetail from "../../_components/ContactUs/contact-detail";
import { Contact } from "@/models/contact";
import { getContactServer } from "@/actions/action";

// Add tag for revalidation
//export const dynamic = "force-dynamic";
// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

async function ContactUsPage() {
  const contact: Contact = await getContactServer();

  if (!contact) {
    return (
      <div>
        <ContactHero />
      </div>
    );
  }

  return (
    <div className="w-full">
      <ContactHero />
      <ContactPerson contact={contact} />
      <ContactDetail contact={contact} />
    </div>
  );
}

export default ContactUsPage;
