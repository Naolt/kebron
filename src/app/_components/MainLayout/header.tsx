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

const LINKS = [
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

const MORE_LINKS = [
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
];

function Header() {
  return (
    <div className="max-w-screen-2xl px-4 md:px-8 py-4 w-full bg-background flex justify-between mx-auto items-center">
      {/* logo */}
      <Image src="/next.svg" alt="logo" width={84} height={36} />
      {/* navs */}
      <div className="hidden md:block">
        <Navigation />
      </div>
      {/* buttons */}
      <div className="hidden md:block">
        <Button>Join</Button>
      </div>
      <MobileNavigation />
    </div>
  );
}

function MobileNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden w-full">
        {LINKS.concat(MORE_LINKS).map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem key={link.href}>{link.label}</DropdownMenuItem>
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
