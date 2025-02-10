import React from "react";
import ContactHero from "../../_components/ContactUs/contact-hero";
import ContactPerson from "../../_components/ContactUs/contact-person";
import ContactDetail from "../../_components/ContactUs/contact-detail";
import { Contact } from "@/models/contact";
import { getContactPerson } from "@/actions/action";

async function ContactUsPage() {
  const contact: Contact = await getContactPerson();
  if (!contact) {
    return <div>No contact person found</div>;
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
