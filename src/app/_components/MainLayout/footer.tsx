import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MAIN_LINKS, RESOURCE_LINKS } from "./header";
import { Contact } from "@/models/contact";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { getContactServer } from "@/actions/action";

const FOOTER_LINKS = [...MAIN_LINKS, ...RESOURCE_LINKS];

// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

async function Footer() {
  const contactInfo: Contact = await getContactServer();

  return (
    <footer className=" px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 bg-[rgba(240,242,251,1)]">
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
          <div className="flex flex-col">
            <Link
              href={`tel:${contactInfo?.phoneNumber}`}
              className="text-sm underline "
            >
              {contactInfo?.phoneNumber}
            </Link>

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
      <p className="text-sm text-center">
        © 2024 Our Church. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
