"use client";

import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MAIN_LINKS, RESOURCE_LINKS } from "./header";
import { Contact } from "@/models/contact";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import FooterLoading from "./footer-loading";

const FOOTER_LINKS = [...MAIN_LINKS, ...RESOURCE_LINKS];

//// Add revalidation tag
//export const revalidate = 0; // Make the page dynamic

//// Add dynamic rendering option
//export const dynamic = "force-dynamic";

async function getContact() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
      {
        next: {
          tags: ["contact"],
        },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch contact");
    return response.json();
  } catch (error) {
    console.error("Error fetching contact:", error);
    return null;
  }
}

function Footer() {
  const [contactInfo, setContactInfo] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsLoading(true);
        const contact = await getContact();
        setContactInfo(contact);
      } catch (error) {
        console.error("Error fetching contact:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (isLoading) {
    return <FooterLoading />;
  }

  return (
    <footer className="px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 bg-[rgba(240,242,251,1)]">
      <div className="max-w-screen-3xl mx-auto flex flex-wrap justify-between gap-6">
        {/* left */}
        <div className="flex flex-col gap-6">
          <Image
            src={"./logo.svg"}
            width={100}
            height={100}
            alt="logo"
            className="mb-2"
          />

          <div>
            <p className="text-sm font-semibold">Address:</p>
            <p className="text-sm">{contactInfo?.address}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Phone:</p>
            <Link
              href={`tel:${contactInfo?.phoneNumber}`}
              className="text-sm underline "
            >
              {contactInfo?.phoneNumber}
            </Link>
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold">Email:</p>
            <Link
              href={`mailto:${contactInfo?.email}`}
              className="text-sm underline"
            >
              {contactInfo?.email}
            </Link>
          </div>

          {/* social links */}
          <div className="flex gap-3 mt-2">
            {contactInfo?.socialLinks?.facebook && (
              <Link href={contactInfo.socialLinks.facebook} target="_blank">
                <Facebook />
              </Link>
            )}
            {contactInfo?.socialLinks?.youtube && (
              <Link href={contactInfo.socialLinks.youtube} target="_blank">
                <Youtube />
              </Link>
            )}
            {contactInfo?.socialLinks?.twitter && (
              <Link href={contactInfo.socialLinks.twitter} target="_blank">
                <Twitter />
              </Link>
            )}
            {contactInfo?.socialLinks?.linkedin && (
              <Link href={contactInfo.socialLinks.linkedin} target="_blank">
                <Linkedin />
              </Link>
            )}
            {/* tiktok */}
            {contactInfo?.socialLinks?.tiktok && (
              <Link href={contactInfo.socialLinks.tiktok} target="_blank">
                <Image
                  src={"/icons/tiktok.svg"}
                  width={24}
                  height={24}
                  alt="tiktok"
                />
              </Link>
            )}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col-reverse ">
          <StaggerContainer className="grid grid-cols-2 gap-x-12">
            {FOOTER_LINKS.slice(0, 5).map((link) => (
              <StaggerItem key={link.label}>
                <Link href={link.href} className="text-sm font-semibold py-2">
                  {link.label}
                </Link>
              </StaggerItem>
            ))}
            {FOOTER_LINKS.slice(5).map((link) => (
              <StaggerItem key={link.label}>
                <Link href={link.href} className="text-sm font-semibold py-2">
                  {link.label}
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
      <Separator className="mt-20 mb-8" />
      <div className="">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/60">
            © {currentYear} Kebron International Church. All rights reserved.
          </p>
          <p className="text-sm text-black/60">
            Developed with ❤️ by{" "}
            <Link
              href="https://naolt.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              Aurora Horizon Solutions
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
