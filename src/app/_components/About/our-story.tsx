import { Button } from "@/components/ui/button";
import { BoxIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const STORIES = [
  {
    title: "Our Rich History",
    description:
      "Founded in 1950, our church has been a beacon of hope and faith in the community for over 70 years.",
    icon: <BoxIcon />,
  },
  {
    title: "Our Mission",
    description:
      "We are dedicated to spreading God's love through worship, education, and community service.",
    icon: <BoxIcon />,
  },
  {
    title: "Our Community",
    description:
      "We welcome people from all walks of life to join our diverse and inclusive faith community.",
    icon: <BoxIcon />,
  },
  {
    title: "Our Future",
    description:
      "We continue to grow and adapt while staying true to our core values and spiritual mission.",
    icon: <BoxIcon />,
  },
];

function OurStory() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28 flex flex-col gap-20">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[768px]">
        <span className="font-semibold">Together</span>
        <h1 className="text-center mt-4">
          Empowering Our Community Through Faith and Service
        </h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`}
        </p>
      </div>
      {/* center section */}
      <div className="flex flex-col lg:flex-row justify-center gap-12">
        <div className="flex flex-col gap-12 items-center lg:items-start justify-center">
          <Card {...STORIES[0]} />
          <Card {...STORIES[1]} />
        </div>
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Our Story"
          width={1920}
          height={1080}
          className="w-full lg:w-[540px] h-[300px] lg:h-[540px] object-cover"
        />
        <div className="flex flex-col gap-12 items-center lg:items-end justify-center">
          <Card {...STORIES[2]} />
          <Card {...STORIES[3]} />
        </div>
      </div>
      {/* button */}
      <Button variant={"ghost"} className="mx-auto">
        Ministry <ChevronRight />
      </Button>
    </section>
  );
}

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="max-w-[338px] h-[194px] flex flex-col items-center justify-center gap-4">
      {icon}
      <h3 className="text-2xl">{title}</h3>
      <p className="text-center">{description}</p>
    </div>
  );
}

export default OurStory;
