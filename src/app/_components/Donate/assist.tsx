"use client";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";

function Assist() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      <div className="flex flex-col mx-auto items-center">
        <span className="font-semibold">Engage</span>
        <h1 className="text-center">Ways to Give</h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Thank you for your generosity. Your giving transforms lives and advances God's work!`}
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
    description: (
      <div className="flex flex-col gap-2">
        <p>
          Give securely and conveniently through our online giving platform.
          Your contributions make a real difference in our community.
        </p>
      </div>
    ),
    action: {
      label: "Make a Donation",
      link: "/donate",
      variant: "primary" as const,
    },
  },
  {
    image: "/donate/in-person-giving.jpg",
    tagline: "Give in Person",
    title: "In-Person Giving",
    description: (
      <div className="flex flex-col gap-2">
        <p>
          Visit our church during service times and make your donation directly
          to our offering box.
        </p>
      </div>
    ),
    action: {
      label: "View Service Times",
      link: "/#our-program",
      variant: "secondary" as const,
    },
  },
  {
    image: "/donate/bank-transfer.jpg",
    tagline: "Bank Details",
    title: "Bank Transfer",
    description: (
      <div className="flex flex-col gap-1">
        <p>Bank: Kreissparkasse Gross-Gerau</p>
        <p>IBAN: DE33 5085 2553 0117 5916 93</p>
        <p>Account Holder: Wudnesh Adamu Shedo</p>
      </div>
    ),
    action: {
      label: "Copy Bank Details",
      onClick: () => {
        navigator.clipboard.writeText("DE33 5085 2553 0117 5916 93");
        toast.success("Bank details copied to clipboard");
      },
      variant: "outline" as const,
    },
  },
];

function Cards() {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {CARD_DATA.map((card, index) => (
        <StaggerItem
          key={index}
          className="flex flex-col border bg-card text-card-foreground transition-all duration-300 "
        >
          {card.image && (
            <div className="relative overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                width={400}
                height={300}
                className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
          <div className="flex flex-col flex-1 p-6">
            <div className="flex-1">
              <div className="space-y-2">
                <span className="text-sm font-medium text-primary">
                  {card.tagline}
                </span>
                <h3 className="font-semibold text-xl">{card.title}</h3>
                <div className="text-muted-foreground">{card.description}</div>
              </div>
            </div>

            <div className="pt-6">
              {"onClick" in card.action ? (
                <button
                  onClick={card.action.onClick}
                  className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2
                    ${
                      card.action.variant === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : card.action.variant === "secondary"
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  {card.action.label}
                </button>
              ) : (
                <a
                  href={card.action.link}
                  className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2
                    ${
                      card.action.variant === "primary"
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : card.action.variant === "secondary"
                        ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        : "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    }`}
                >
                  {card.action.label}
                </a>
              )}
            </div>
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export default Assist;
