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
import { getContactPerson } from "@/actions/action";

const FOOTER_LINKS = [...MAIN_LINKS, ...RESOURCE_LINKS];

async function Footer() {
  const contactInfo: Contact = await getContactPerson();

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
          <div>
            <p className="text-sm underline">{contactInfo?.phoneNumber}</p>

            <p className="text-sm underline">{contactInfo?.email}</p>
          </div>

          {/* social links */}
          <div className="flex gap-3 mt-2">
            {contactInfo?.socialLinks?.facebook && <Facebook />}
            {contactInfo?.socialLinks?.youtube && <Youtube />}
            {contactInfo?.socialLinks?.twitter && <Twitter />}
            {contactInfo?.socialLinks?.linkedin && <Linkedin />}
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
