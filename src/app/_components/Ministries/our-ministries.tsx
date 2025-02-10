import { FadeInView } from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OurMinistries() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-2 justify-between">
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Ministry</h2>
          <div className="text-gray-600 space-y-4 text-base sm:text-lg max-w-[600px]">
            <p>
              Our ministry is dedicated to preaching the Good News, transforming
              lives, and guiding individuals to fulfill God’s purpose. Through
              our efforts, lives have been changed, marriages restored, broken
              hearts mended, and families healed. With a deep passion, we seize
              every opportunity and open door God provides to spread the Gospel
              across major cities in Germany, including Frankfurt, Mainz,
              Rüsselsheim, Darmstadt, Duisburg, and Düsseldorf. As proud
              partners of the United Gospel Campaign, we host healing events
              each quarter. Our energetic, youthful preachers bring fresh,
              creative approaches to teaching the timeless message of the
              Gospel, while our dynamic media team reaches thousands through
              social media platforms, engaging and inspiring the next
              generation.
            </p>
          </div>
          <Link href={"/donate"}>
            <Button variant="outline" className="w-fit">
              Join Us
            </Button>
          </Link>
        </div>
        <Image
          src="/ministry/our-ministry.jpg"
          alt="Our Story"
          width={1920}
          height={1080}
          className="w-[600px] h-[400px] sm:h-[500px] lg:h-[640px] object-cover "
        />
      </div>
    </FadeInView>
  );
}

export default OurMinistries;
