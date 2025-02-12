"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, MenuIcon, Heart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MAIN_LINKS, RESOURCE_LINKS } from "./header";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

function MobileNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:hidden w-[250px]">
        {MAIN_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem className="flex items-center ">
              {link.icon}
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        {RESOURCE_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem className="flex items-center">
              {link.icon}
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/donate" className="w-full">
            <Button size="sm" className="w-full gap-2">
              <Heart className="w-4 h-4" />
              Donate
            </Button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Navigation() {
  const pathname = usePathname();
  return (
    <div className="flex gap-8 items-center">
      {MAIN_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`hover:text-primary transition-colors ${
            pathname === link.href ? "font-bold" : ""
          }`}
        >
          {link.label}
        </Link>
      ))}
      <ResourceMenuTwo />
    </div>
  );
}

function ResourcesMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:text-primary transition-colors">
        <span className="flex items-center gap-2">
          Resources <ChevronDown className="w-4 h-4" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {RESOURCE_LINKS.map((link) => (
          <Link href={link.href} key={link.href}>
            <DropdownMenuItem className="flex items-center">
              {link.icon}
              {link.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ResourceMenuTwo() {
  const pathname = usePathname();
  return (
    <NavigationMenu className="h-auto p-0 m-0">
      <NavigationMenuList className="h-auto p-0 m-0">
        <NavigationMenuItem className="p-0 m-0">
          <NavigationMenuTrigger
            className={cn(
              "p-0 m-0 h-auto hover:text-primary transition-colors bg-transparent hover:bg-transparent data-[state=open]:bg-transparent text-base font-normal ",
              RESOURCE_LINKS.some((link) => pathname === link.href)
                ? "font-bold"
                : ""
            )}
          >
            Resources
          </NavigationMenuTrigger>
          <NavigationMenuContent className="border p-0 md:w-[300px] lg:w-[500px]">
            <ul className="m-0 p-4 grid grid-cols-7 gap-x-4">
              <li className="list-none p-0 m-0 col-span-3 hidden lg:block">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="/logo.svg"
                      alt="logo"
                      width={100}
                      height={100}
                      className=""
                    />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Kebron International Church
                    </div>
                    <p className="text-[13px] leading-tight text-muted-foreground">
                      {`"For where two or three gather in my name, there am I with
                      them." - Matthew 18:20`}
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <div className="grid gap-3 col-span-7 lg:col-span-4">
                {RESOURCE_LINKS.map((link) => (
                  <ListItem
                    className={cn(
                      pathname === link.href ? "bg-primary/10" : ""
                    )}
                    key={link.href}
                    href={link.href}
                    title={link.label}
                  >
                    {link.description}
                  </ListItem>
                ))}
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export { MobileNavigation, Navigation, ResourcesMenu };
