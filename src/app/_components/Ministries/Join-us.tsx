import { Button } from "@/components/ui/button";
import React from "react";

function JoinUs() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28 flex gap-8 flex-wrap justify-between items-center">
      <div className="flex flex-col gap-6">
        <h1>Join Our Vibrant Ministries Today</h1>
        <p className="text-lg">Discover how you can make a difference.</p>
      </div>
      <div className="flex gap-4">
        <Button>Get Involved</Button>
        <Button variant={"outline"}>Learn More</Button>
      </div>
    </section>
  );
}

export default JoinUs;
