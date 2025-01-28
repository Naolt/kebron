import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

function OurProgram() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col">
        <span className="font-semibold">Welcome</span>
        <h1 className="mt-4 max-w-[850px]">
          Experience Our Thriving Church Family
        </h1>
        <p className="max-w-[800px] mt-6">
          {`At our church, we offer a variety of activities designed to foster
          spiritual growth and community connection. From worship services to
          outreach programs, there's something for everyone.how`}
        </p>
        <div className="flex gap-4 mt-8">
          <Button variant={"outline"}>Learn More</Button>
          <Button variant={"ghost"}>
            Join Us
            <ChevronRight />
          </Button>
        </div>
      </div>
      {/* Program list */}
      <HorizontalProgramsList />
      <VerticalProgramsList />
    </section>
  );
}

const PROGRAMS = [
  {
    title: "Worship Services",
    description:
      "JLorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    title: "Community Events",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "https://picsum.photos/400/300?random=2",
  },
  {
    title: "Outreach Programs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "https://picsum.photos/400/300?random=3",
  },
  {
    title: "Youth Programs",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "https://picsum.photos/400/300?random=4",
  },
  {
    title: "Women's Worship",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
    image: "https://picsum.photos/400/300?random=5",
  },
];

function HorizontalProgramsList() {
  return (
    <div className="w-full mt-20 md:hidden lg:block">
      {/* Desktop view */}
      <div className="relative hidden md:flex justify-between gap-2 items-center">
        {PROGRAMS.map((program, index) => (
          <div key={index} className="flex flex-col w-1/5">
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
                className="object-cover"
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
          </div>
        ))}
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col gap-8">
        {PROGRAMS.map((program, index) => (
          <div key={index} className="flex flex-col border border-black">
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
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalProgramsList() {
  return (
    <div className="w-full mt-20 hidden md:block lg:hidden">
      <div className="max-w-4xl mx-auto">
        {PROGRAMS.map((program, index) => (
          <div key={index} className="flex gap-8 items-start mb-16 h-[180px]">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurProgram;
