import { FadeInView } from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function JoinUs() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex gap-8 flex-wrap justify-between items-center">
      <div className="flex flex-col gap-6">
        <h1>Join Our Vibrant Ministries Today</h1>
        <p className="text-lg">Discover how you can make a difference.</p>
      </div>
      <div className="flex gap-4">
        <Link href={"/donate"}>
          <Button>Get Involved</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant={"outline"}>Learn More</Button>
        </Link>
      </div>
    </FadeInView>
  );
}

export default JoinUs;
