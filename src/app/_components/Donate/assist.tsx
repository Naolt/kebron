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

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      description: donationSettings?.bankAccounts && (
        <div className="space-y-4">
          {/* Show primary account */}
          {donationSettings.bankAccounts[0] && (
            <div className="flex flex-col gap-1">
              <p className="font-medium">
                {donationSettings.bankAccounts[0].description}
              </p>
              <p>Bank: {donationSettings.bankAccounts[0].bankName}</p>
              <p>IBAN: {donationSettings.bankAccounts[0].iban}</p>
              <p>
                Account Holder: {donationSettings.bankAccounts[0].accountHolder}
              </p>
            </div>
          )}
        </div>
      ),
      action: {
        label: `View All Bank Accounts (${
          donationSettings?.bankAccounts?.length || 0
        })`,
        onClick: () => {
          const dialogTrigger = document.querySelector(
            "[data-bank-accounts-dialog-trigger]"
          ) as HTMLButtonElement;
          if (dialogTrigger) {
            dialogTrigger.click();
          }
        },
        variant: "primary" as const,
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

      {/* Show dialog for additional accounts if they exist */}
      {donationSettings?.bankAccounts &&
        donationSettings.bankAccounts.length > 0 && (
          <div className="hidden">
            <Dialog>
              <DialogTrigger data-bank-accounts-dialog-trigger asChild>
                <Button variant="outline" className="w-full">
                  View Bank Accounts
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Bank Account Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 mt-4">
                  {donationSettings.bankAccounts.map((account, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      {index > 0 && <div className="border-t pt-4" />}
                      <div className="flex justify-between items-start">
                        <p className="font-medium text-lg">
                          {account.description}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${account.description}\nBank: ${account.bankName}\nIBAN: ${account.iban}\nAccount Holder: ${account.accountHolder}`
                            );
                            toast.success(
                              `${account.description} details copied`
                            );
                          }}
                        >
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </Button>
                      </div>
                      <div className="space-y-1 text-muted-foreground">
                        <p>Bank: {account.bankName}</p>
                        <p>IBAN: {account.iban}</p>
                        <p>Account Holder: {account.accountHolder}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        )}
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
