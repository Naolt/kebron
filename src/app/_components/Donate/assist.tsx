"use client";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Donation } from "@/models/donation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import DonateLoading from "./loading";

type CardData = {
  image: string;
  tagline: string;
  title: string;
  description: React.ReactNode;
  action: {
    label: string;
    link?: string;
    onClick?: () => void;
    variant: "primary" | "secondary" | "outline";
  };
};

function Assist() {
  const [donationSettings, setDonationSettings] = useState<Donation | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  const CARD_DATA: CardData[] = [
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
        link: donationSettings?.onlineGivingLink || "#",
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
            Visit our church during service times and make your donation
            directly to our offering box.
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
      description: donationSettings?.bankDetails && (
        <div className="flex flex-col gap-1">
          <p>Bank: {donationSettings.bankDetails.bankName}</p>
          <p>IBAN: {donationSettings.bankDetails.iban}</p>
          <p>Account Holder: {donationSettings.bankDetails.accountHolder}</p>
        </div>
      ),
      action: {
        label: "Copy Bank Details",
        onClick: () => {
          navigator.clipboard.writeText(
            donationSettings?.bankDetails?.iban || ""
          );
          toast.success("Bank details copied to clipboard");
        },
        variant: "outline" as const,
      },
    },
  ];

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/donations/settings");
        if (!response.ok) throw new Error("Failed to fetch settings");
        const data = await response.json();
        setDonationSettings(data);
      } catch (error) {
        console.error("Error fetching donation settings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (isLoading) {
    return <DonateLoading />;
  }

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
      <Cards CARD_DATA={CARD_DATA} />
    </FadeInView>
  );
}

function Cards({ CARD_DATA }: { CARD_DATA: CardData[] }) {
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
