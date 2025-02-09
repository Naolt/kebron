import * as React from "react";

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
  EyeIcon,
  GalleryVerticalIcon,
  LogOut,
  VideoIcon,
  VideotapeIcon,
} from "lucide-react";
import { Button } from "./ui/button";

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
      title: "Webinars",
      url: "/admin/webinars",
    },
    {
      icon: <ContactIcon />,
      title: "Contact",
      url: "/admin/contact",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <Button>
          <EyeIcon /> View Site
        </Button>
        <Button variant="ghost">
          <LogOut /> Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
