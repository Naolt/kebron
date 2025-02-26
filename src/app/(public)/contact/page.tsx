import React from "react";
import ContactHero from "../../_components/ContactUs/contact-hero";
import ContactPerson from "../../_components/ContactUs/contact-person";
import ContactDetail from "../../_components/ContactUs/contact-detail";
import { Metadata } from "next";

async function ContactUsPage() {
  return (
    <div className="w-full">
      <ContactHero />
      <ContactPerson />
      <ContactDetail />
    </div>
  );
}

export default ContactUsPage;

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Connect with Kebron International Church in Rüsselsheim. Join our services, reach out for prayer, or become part of our community. We're here to welcome you!",
  keywords:
    "contact church, church location, church address, visit church, church services",
  openGraph: {
    title: "Contact Kebron International Church",
    description: "Connect with our community in Rüsselsheim",
    images: [{ url: "/home/hero5.JPG" }],
  },
};
