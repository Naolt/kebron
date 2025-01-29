import { Button } from "@/components/ui/button";
import { BoxIcon, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const IMPACTS = [
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Engaging Activities",
    description:
      "From retreats to community service, we create memorable experiences that strengthen faith.",
  },
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Mentorship Programs",
    description:
      "Our mentors guide youth in their spiritual journeys, fostering personal and communal growth.",
  },
];

function WhatWeDo() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col lg:flex-row gap-20 justify-between items-center">
        <div className="flex flex-col mx-auto">
          <span className="font-semibold">Empower</span>
          <h1 className="mt-4">Nurturing the Next Generation of Leaders</h1>
          <p className="max-w-[800px] mt-6">
            {`Our Youth Ministry is dedicated to fostering spiritual growth and community among young people. Through engaging activities and mentorship, we aim to inspire faith and leadership in the next generation.`}
          </p>

          {/* impact metrics */}
          <div className="grid grid-cols-2 mt-8 gap-2">
            {IMPACTS.map((impact, index) => (
              <div key={index} className="flex flex-col gap-4">
                {impact.icon}
                <h4 className="text-[20px]">{impact.number}</h4>
                <p>{impact.description}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-8">
            <Button variant={"outline"}>Learn More</Button>
            <Button variant={"ghost"}>
              Join Us
              <ChevronRight />
            </Button>
          </div>
        </div>
        {/* image section */}
        <Image
          src={"https://picsum.photos/600/600"}
          width={616}
          height={640}
          alt="Our Impact"
        />
      </div>
    </section>
  );
}

export default WhatWeDo;
