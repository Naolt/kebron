import { Button } from "@/components/ui/button";

import {
  Users,
  BookOpen,
  Image as ImageIcon,
  Heart,
  Home,
  Info,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MobileNavigation, Navigation } from "./navigation";

export const MAIN_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: <Home className="w-4 h-4 mr-2" />,
  },
  {
    label: "About Us",
    href: "/about",
    icon: <Info className="w-4 h-4 mr-2" />,
  },
  {
    label: "Contact Us",
    href: "/contact",
    icon: <Mail className="w-4 h-4 mr-2" />,
  },
];

export const RESOURCE_LINKS = [
  {
    label: "Ministries",
    href: "/ministries",
    icon: <Users className="w-4 h-4 mr-2" />,
    description: "Join our various ministries and activities",
  },
  {
    label: "Sermons",
    href: "/sermons",
    icon: <BookOpen className="w-4 h-4 mr-2" />,
    description: "Listen to our sermons and teachings",
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: <ImageIcon className="w-4 h-4 mr-2" />,
    description: "View our various events and activities",
  },
  {
    label: "Donate",
    href: "/donate",
    icon: <Heart className="w-4 h-4 mr-2" />,
    description: "Support our various activities and ministries",
  },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-screen-3xl px-4 sm:px-8 lg:px-16 w-full flex justify-between mx-auto items-center">
        {/* logo */}
        <Link href="/" className="">
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
        {/* donate button */}
        <div className="hidden md:block">
          <Link href="/donate">
            <Button className="gap-2">
              <Heart className="w-4 h-4" />
              Donate
            </Button>
          </Link>
        </div>
        <MobileNavigation />
      </div>
    </header>
  );
}

export default Header;
