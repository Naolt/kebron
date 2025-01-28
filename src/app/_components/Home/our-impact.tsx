import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const IMPACTS = [
  {
    number: "200%",
    description:
      "Members actively participating in community service initiatives.",
  },
  {
    number: "1000+",
    description: "Community events hosted each year for all ages.",
  },
];

function OurImpact() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col lg:flex-row gap-20 justify-between items-center">
        <div className="flex flex-col mx-auto">
          <span className="font-semibold">Growth</span>
          <h1 className="mt-4">
            Celebrating Our Impact and Community Engagement
          </h1>
          <p className="max-w-[800px] mt-6">
            {`At our church, we offer a variety of activities designed to foster
          spiritual growth and community connection. From worship services to
          outreach programs, there's something for everyone.how`}
          </p>

          {/* impact metrics */}
          <div className="grid grid-cols-2 mt-8 gap-2">
            {IMPACTS.map((impact, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h4>{impact.number}</h4>
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

export default OurImpact;
