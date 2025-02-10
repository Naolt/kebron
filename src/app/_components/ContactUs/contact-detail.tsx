import { Contact } from "@/models/contact";
import { Map, Mail, Phone } from "lucide-react";
import React from "react";
import Location from "./location";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";

function ContactDetail({ contact }: { contact: Contact }) {
  const CONTACT_DETAIL = [
    {
      icon: <Mail />,
      label: "Email",
      value: <span className="underline">{contact?.email}</span>,
      description: "Reach as any time at",
    },
    {
      icon: <Phone />,
      label: "Phone",
      value: <span className="underline">{contact?.phoneNumber}</span>,
      description: "Reach as any time at",
    },
    {
      icon: <Map />,
      label: "Address",
      value: <></>,
      description: contact?.address,
    },
  ];

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex flex-col gap-20">
      {/* header */}

      <FadeInView className="flex flex-col">
        <span className="font-semibold">Connect</span>
        <h1 className="mt-4">Contact Us</h1>
        <p className="max-w-[800px] mt-4">
          {`We'd love to hear from you and connect!`}
        </p>
      </FadeInView>

      {/* contact detail */}
      <div className="flex justify-between gap-8 flex-wrap">
        <StaggerContainer className="flex flex-col gap-10">
          {CONTACT_DETAIL.map((item) => (
            <StaggerItem key={item.label} className="flex flex-col gap-2">
              {item.icon}
              <span className="mt-2 font-bold text-xl">{item.label}</span>
              <p>{item.description}</p>
              {item.value}
            </StaggerItem>
          ))}
        </StaggerContainer>
        {/* map embed */}
        <Location mapEmbedLink={contact?.mapEmbedLink} />
      </div>
    </section>
  );
}

export default ContactDetail;
