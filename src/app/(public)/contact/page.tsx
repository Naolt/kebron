import React from "react";
import ContactHero from "../../_components/ContactUs/contact-hero";
import ContactPerson from "../../_components/ContactUs/contact-person";
import ContactDetail from "../../_components/ContactUs/contact-detail";

function ContactUsPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactPerson />
      <ContactDetail />
    </div>
  );
}

export default ContactUsPage;
