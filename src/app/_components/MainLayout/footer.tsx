import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FOOTER_LINKS = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Our Program",
    link: "/our-program",
  },
  {
    title: "Our Impact",
    link: "/our-impact",
  },
  {
    title: "Join Community",
    link: "/join-community",
  },
  {
    title: "Join Us",
    link: "/join-us",
  },
  {
    title: "Events",
    link: "/events",
  },
  {
    title: "Sermons",
    link: "/sermons",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Donate",
    link: "/donate",
  },
];

function Footer() {
  return (
    <footer className=" py-28 px-8 bg-[rgba(240,242,251,1)]">
      <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-between gap-6">
        {/* left */}
        <div className="flex flex-col gap-6">
          <Image
            src={"./next.svg"}
            width={100}
            height={100}
            alt="logo"
            className="mb-2"
          />

          <div>
            <p className="text-sm font-semibold">Address:</p>
            <p className="text-sm">Level 1, 12 Sample St, Sydney NSW 2000</p>
          </div>
          <div>
            <p className="text-sm underline">1800 123 4567</p>
            <p className="text-sm underline">info@ourchurch.org</p>
          </div>

          {/* social links */}
          <div className="flex gap-3 mt-2">
            <Facebook />
            <Instagram />
            <Twitter />
            <Linkedin />
            <Youtube />
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col-reverse ">
          <div className="grid grid-cols-2 gap-x-12">
            {FOOTER_LINKS.slice(0, 5).map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="text-sm font-semibold py-2"
              >
                {link.title}
              </Link>
            ))}
            {FOOTER_LINKS.slice(5).map((link) => (
              <Link
                key={link.title}
                href={link.link}
                className="text-sm font-semibold py-2"
              >
                {link.title}
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
