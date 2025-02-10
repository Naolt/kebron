import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import Image from "next/image";
import React from "react";

function Assist() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-16 py-20">
      <div className="flex flex-col mx-auto items-center">
        <span className="font-semibold">Engage</span>
        <h1 className="text-center">Ways to Give</h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Thank you for your generosity. Your giving transforms lives and advances God’s work!`}
        </p>
      </div>

      {/* cards */}
      <Cards />
    </FadeInView>
  );
}

const CARD_DATA = [
  {
    image: "/donate/online-giving.jpg",
    tagline: "Donate Today",
    title: "Online Giving",
    description:
      "Give securely and conveniently through our online giving platform. Your contributions make a real difference in our community.",

    link: {
      label: "Donate Now",
      link: "/donate",
    },
  },
  {
    image: "/donate/in-person-giving.jpg",
    tagline: "Give in Person",
    title: "In-Person Giving",
    description:
      "Visit our church during service times and make your donation directly to our offering box.",
    link: {
      label: "Donate Now",
      link: "/donate",
    },
  },
  {
    image: "/donate/bank-transfer.jpg",
    tagline: "Donate Today",
    title: "Bank Transfer",
    description:
      "Transfer funds directly from your bank account to our church’s designated account.",
    link: {
      label: "Donate Now",
      link: "/donate",
    },
  },
];

function Cards() {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {CARD_DATA.map((card, index) => (
        <StaggerItem
          key={index}
          className="flex flex-col gap-4 border border-gray-900"
        >
          {card.image && (
            <Image
              src={card.image}
              alt={card.title}
              width={400}
              height={300}
              className="w-full h-[200px] object-cover "
            />
          )}
          <div className="flex flex-col gap-4 p-8 h-full">
            <span className="font-semibold">{card.tagline}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a
              href={card.link.link}
              className="flex items-center gap-2 mt-auto "
            >
              {card.link.label}
              <span>→</span>
            </a>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export default Assist;
