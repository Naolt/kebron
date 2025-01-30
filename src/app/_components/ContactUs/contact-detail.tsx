import { Map, Mail, Phone, ChevronRight } from "lucide-react";
import React from "react";

const CONTACT_DETAIL = [
  {
    icon: <Mail />,
    label: "Email",
    value: <span className="underline">hello@relume.io</span>,
    description: "Reach as any time at",
  },
  {
    icon: <Phone />,
    label: "Phone",
    value: <span className="underline">+123 456 7890</span>,
    description: "Reach as any time at",
  },
  {
    icon: <Map />,
    label: "Address",
    value: (
      <span className="flex items-center gap-2">
        Get Directions <ChevronRight />
      </span>
    ),
    description: "123 Sample St, Sydney NSW 2000 AU",
  },
];

function ContactDetail() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28 flex flex-col gap-20">
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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.8773118760357!2d151.20544851521253!3d-33.86882728065282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ae401e8b983f%3A0x5017d681632ccc0!2s123%20Sample%20St%2C%20Sydney%20NSW%202000%2C%20Australia!5e0!3m2!1sen!2sus!4v1635774838459!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="max-w-[832px] rounded-lg"
        ></iframe>
      </div>
    </section>
  );
}

export default ContactDetail;
