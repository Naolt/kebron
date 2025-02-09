import { Contact } from "@/models/contact";
import { Map, Mail, Phone, ChevronRight } from "lucide-react";
import React from "react";
import Location from "./location";

async function getContactInfo() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching contact person:", error);
    return null;
  }
}

async function ContactDetail() {
  const contactInfo: Contact = await getContactInfo();

  const CONTACT_DETAIL = [
    {
      icon: <Mail />,
      label: "Email",
      value: <span className="underline">{contactInfo?.email}</span>,
      description: "Reach as any time at",
    },
    {
      icon: <Phone />,
      label: "Phone",
      value: <span className="underline">{contactInfo?.phoneNumber}</span>,
      description: "Reach as any time at",
    },
    {
      icon: <Map />,
      label: "Address",
      value: <></>,
      description: contactInfo?.address,
    },
  ];

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex flex-col gap-20">
      {/* header */}

      <div className="flex flex-col">
        <span className="font-semibold">Connect</span>
        <h1 className="mt-4">Contact Us</h1>
        <p className="max-w-[800px] mt-4">
          {`We'd love to hear from you and connect!`}
        </p>
      </div>

      {/* contact detail */}
      <div className="flex justify-between gap-8 flex-wrap">
        <div className="flex flex-col gap-10">
          {CONTACT_DETAIL.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              {item.icon}
              <span className="mt-2 font-bold text-xl">{item.label}</span>
              <p>{item.description}</p>
              {item.value}
            </div>
          ))}
        </div>
        {/* map embed */}
        <Location mapEmbedLink={contactInfo?.mapEmbedLink} />
      </div>
    </section>
  );
}

export default ContactDetail;
