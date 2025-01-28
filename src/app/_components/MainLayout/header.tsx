import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <div className="max-w-screen-2xl px-16 py-4 w-full bg-background flex justify-between mx-auto items-center">
      {/* logo */}
      <Image src="/next.svg" alt="logo" width={84} height={36} />
      {/* navs */}
      <div>
        <Navigation />
      </div>
      {/* buttons */}
      <div>
        <Button>Join</Button>
      </div>
    </div>
  );
}

export default Header;

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
    label: "Link 1",
    href: "/link-1",
  },
];

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
          <DropdownMenuItem key={link.href}>{link.label}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
