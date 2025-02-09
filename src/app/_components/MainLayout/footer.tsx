import { Separator } from "@/components/ui/separator";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { LINKS, MORE_LINKS } from "./header";
import { Contact } from "@/models/contact";

const FOOTER_LINKS = [...LINKS, ...MORE_LINKS];

async function getContactInfo() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching contact person:", error);
    return null;
  }
}

async function Footer() {
  const contactInfo: Contact = await getContactInfo();
  return (
    <footer className=" py-28 px-16 bg-[rgba(240,242,251,1)]">
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
          <div className="grid grid-cols-2 gap-x-12">
            {FOOTER_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold py-2"
              >
                {link.label}
              </Link>
            ))}
            {FOOTER_LINKS.slice(5).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>
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
