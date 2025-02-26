"use client";
import * as React from "react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  ContactIcon,
  CreditCardIcon,
  EyeIcon,
  GalleryVerticalIcon,
  LogOut,
  VideoIcon,
  VideotapeIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      icon: <GalleryVerticalIcon />,
      title: "Gallery",
      url: "/admin",
    },
    {
      icon: <VideoIcon />,
      title: "Sermons",
      url: "/admin/sermons",
    },
    {
      icon: <VideotapeIcon />,
      title: "Live-streams",
      url: "/admin/livestreams",
    },
    {
      icon: <ContactIcon />,
      title: "Contact",
      url: "/admin/contact",
    },
    {
      icon: <CreditCardIcon />,
      title: "Donations",
      url: "/admin/donations",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-6">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-2 p-6 pt-2 pl-4">
        {data.navMain.map((item) => (
          <SidebarMenu key={item.title}>
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={false}>
                <a href={item.url} className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <Link href="/" className="w-full">
          <Button className="w-full">
            <EyeIcon /> View Site
          </Button>
        </Link>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut /> Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
