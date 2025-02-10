import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IMPACTS = [
  {
    number: "20",
    description:
      "Community Outreach: We are committed to serving those in need by providing food, clothing, and support to local families. Our outreach initiatives aim to meet practical needs while sharing the love of Christ.",
  },
  {
    number: "10+",
    description:
      "Global Missions: Our church is passionate about reaching the nations. We partner with missionaries and organizations worldwide to spread the message of Jesus Christ, bringing hope and support to communities in need.",
  },
];

function OurImpact() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <FadeInView>
        <div className="flex flex-col lg:flex-row gap-20 justify-between items-center">
          <div className="flex flex-col mx-auto">
            <span className="font-semibold">Growth</span>
            <h1 className="mt-4">
              Celebrating Our Impact and Community Engagement
            </h1>
            <p className="max-w-[800px] mt-6">
              {`At Kebron International Church, we are dedicated to making a positive and lasting impact in our community and beyond. Through our ministries, outreach programs, and the power of the Gospel, we strive to be a beacon of hope, love, and transformation.`}
            </p>

            {/* impact metrics */}
            <StaggerContainer className="grid grid-cols-2 mt-8 gap-2">
              {IMPACTS.map((impact, index) => (
                <StaggerItem key={index} className="flex flex-col gap-2">
                  <h1>{impact.number}</h1>
                  <p>{impact.description}</p>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="flex gap-4 mt-8">
              <Link href={"/donate"}>
                <Button variant={"outline"}>Join Us</Button>
              </Link>
            </div>
          </div>
          {/* image section */}
          <Image
            src={"/home/celebration.JPG"}
            width={616}
            height={640}
            alt="Our Impact"
            className=""
          />
        </div>
      </FadeInView>
    </section>
  );
}

export default OurImpact;
