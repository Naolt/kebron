import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

export const MORE_LINKS = [
  {
    label: "Ministries",
    href: "/ministries",
  },
  {
    label: "Sermons",
    href: "/sermons",
  },
  {
    label: "Gallery",
    href: "/gallery",
  },
  {
    label: "Donate",
    href: "/donate",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-3xl px-4 md:px-16  w-full flex justify-between mx-auto items-center">
        {/* logo */}
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="logo"
            width={1920}
            height={1080}
            className="w-16 h-16"
          />
        </Link>
        {/* navs */}
        <div className="hidden md:block">
          <Navigation />
        </div>
        {/* buttons */}
        <div className="hidden md:block">
          <Link href="/donate">
            <Button>Donate</Button>
          </Link>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}

function MobileNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden w-[200px]">
        {LINKS.concat(MORE_LINKS).map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem
              key={link.href}
              className="flex justify-center items-center"
            >
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button className="w-full">Join</Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Navigation() {
  return (
    <div className="flex gap-8">
      {LINKS.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
      <MoreLinks />
    </div>
  );
}

function MoreLinks() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="flex items-center gap-2">
          More Links <ChevronDown />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {MORE_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem key={link.href}>{link.label}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Header;
