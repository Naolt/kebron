import { Contact } from "@/models/contact";
import { Map, Mail, Phone } from "lucide-react";
import React from "react";
import Location from "./location";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import Link from "next/link";

function ContactDetail({ contact }: { contact: Contact }) {
  const CONTACT_DETAIL = [
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: (
        <Link href={`mailto:${contact?.email}`} className="underline">
          {contact?.email}
        </Link>
      ),
      description: "Reach us any time at",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      label: "Phone",
      value: (
        <Link href={`tel:${contact?.phoneNumber}`} className="underline">
          {contact?.phoneNumber}
        </Link>
      ),
      description: "Reach us any time at",
    },
    {
      icon: <Map className="h-6 w-6" />,
      label: "Address",
      value: <></>,
      description: contact?.address,
    },
  ];

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* header */}
      <FadeInView className="flex flex-col">
        <span className="font-semibold">Connect</span>
        <h1 className="mt-4">Contact Us</h1>
        <p className="max-w-[800px] mt-4">
          {`We'd love to hear from you and connect!`}
        </p>
      </FadeInView>

      {/* contact detail and map container */}
      <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* contact details */}
        <StaggerContainer className="flex flex-col gap-8 sm:gap-10">
          {CONTACT_DETAIL.map((item) => (
            <StaggerItem
              key={item.label}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
            >
              {/* Icon container */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/5">
                {React.cloneElement(item.icon, {
                  className: "text-primary",
                })}
              </div>
              {/* Content */}
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg">{item.label}</span>
                <p className="text-muted-foreground">{item.description}</p>
                {item.value}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* map */}
        <div className="w-full h-full min-h-[300px] sm:min-h-[400px] lg:min-h-0">
          <Location mapEmbedLink={contact?.mapEmbedLink} />
        </div>
      </div>
    </section>
  );
}

export default ContactDetail;
