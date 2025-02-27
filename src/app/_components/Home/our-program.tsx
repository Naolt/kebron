"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";

function OurProgram() {
  return (
    <section
      id="our-program"
      className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28"
    >
      {/* heading section */}
      <FadeInView>
        <div className="flex flex-col">
          <span className="font-semibold">Welcome</span>
          <h1 className="mt-4 max-w-[850px]">
            Here is our weekly schedule of services and programs
          </h1>
          <p className="max-w-[800px] mt-6">
            {`At our church, we offer a variety of activities designed to foster
            spiritual growth and community connection. From worship services to
            outreach programs, there's something for everyone.`}
          </p>
          <div className="flex gap-4 mt-8">
            <Link href="/about">
              <Button variant={"outline"}>Learn More</Button>
            </Link>
            <Link href="/donate">
              <Button variant={"ghost"}>
                Join Us
                <ChevronRight />
              </Button>
            </Link>
          </div>
        </div>
      </FadeInView>

      {/* Program lists */}
      <StaggerContainer>
        <HorizontalProgramsList />
        <VerticalProgramsList />
      </StaggerContainer>
    </section>
  );
}

const PROGRAMS: {
  title: string;
  description: string;
  image: string;
}[] = [
  {
    title: "Sunday Service",
    description: `Join us every Sunday from 3:00 PM to 6:30 PM for a powerful time of worship, prayer, and a message from the Word of God.`,
    image: "/home/preaching.webp",
  },
  {
    title: "Sunday School",
    description: `Our Sunday School program runs parallel to the main service from 3:00 PM to 6:30 PM, offering engaging Biblical teachings for children through fun and interactive activities.`,
    image: "/ministry/kids.jpg",
  },
  {
    title: "Virtual Prayer",
    description: `Join us every Friday from 9:00 PM to 11:00 PM as we gather together in prayer, lifting up personal needs, our church family, and global concerns to the Lord.`,
    image: "/home/prayer.JPG",
  },
  {
    title: "Young Adults Program",
    description: `Our Young Adults program is coming soon! Stay tuned to our announcements for more details about this exciting new ministry.`,
    image: "/home/youth.JPG",
  },
  {
    title: "Outreach Programs",
    description: `We conduct quarterly outreach programs in major German cities including Frankfurt, Mainz, Rüsselsheim, Darmstadt, Duisburg, and Düsseldorf. Join us in spreading God's love throughout these communities.`,
    image: "/home/outreach2.jpg",
  },
];

function HorizontalProgramsList() {
  return (
    <div className="w-full mt-20 md:hidden lg:block">
      {/* Desktop view */}
      <div className="relative hidden md:flex justify-between gap-2 items-center">
        {PROGRAMS.map((program, index) => (
          <StaggerItem key={index} className="flex flex-col w-1/5">
            {/* Image */}
            <div
              className={`relative h-[180px] flex ${
                index % 2 === 1 ? "order-3 items-start" : "items-end"
              }`}
            >
              <Image
                src={program.image}
                alt={program.title}
                width={180}
                height={180}
                className="object-cover w-[80%] h-[80%]"
              />
            </div>

            <div className="flex gap-2 w-full items-center my-4 order-2">
              {/* Timeline dot */}
              <div className="w-4 h-4 rounded-full bg-primary aspect-square" />
              {/* Timeline line */}
              <div className="w-full h-[3px] bg-black" />
            </div>

            {/* Content */}
            <div
              className={`flex flex-col h-[180px] ${
                index % 2 === 1
                  ? "order-1 justify-end"
                  : "order-3 justify-start"
              }`}
            >
              <h3 className="m-0">{program.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {program.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-8">
        {PROGRAMS.map((program, index) => (
          <StaggerItem
            key={index}
            className="flex flex-col border border-black"
          >
            {/* Image */}
            <div className="relative h-[200px]">
              <Image
                src={program.image}
                alt={program.title}
                width={400}
                height={200}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="m-0">{program.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">
                {program.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </div>
    </div>
  );
}

function VerticalProgramsList() {
  return (
    <div className="w-full mt-20 hidden md:block lg:hidden">
      <div className="max-w-4xl mx-auto px-16">
        {PROGRAMS.map((program, index) => (
          <StaggerItem
            key={index}
            className="flex gap-8 items-start mb-16 h-[180px]"
          >
            {/* Content */}

            <div className="flex flex-col md:flex-row gap-8 flex-1 hfu">
              {/* Image */}
              <div
                className={cn(
                  "relative h-[240px] md:w-1/2",
                  index % 2 === 1 ? "order-3" : "order-1"
                )}
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  width={400}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-2 h-full items-center my-4 order-2">
                {/* Timeline dot */}
                <div className="w-4 h-4 rounded-full bg-primary aspect-square" />
                {/* Timeline line */}
                <div className="h-[180px] w-0.5 bg-black" />
              </div>

              {/* Text content */}
              <div
                className={cn(
                  "md:w-1/2 pt-4",
                  index % 2 === 1 ? "order-1" : "order-3"
                )}
              >
                <h3 className="m-0">{program.title}</h3>
                <p className="text-muted-foreground mt-4">
                  {program.description}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </div>
    </div>
  );
}

export default OurProgram;
