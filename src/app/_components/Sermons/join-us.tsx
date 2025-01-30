import { Button } from "@/components/ui/button";
import React from "react";

function JoinUs() {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-28 flex flex-col items-center justify-center">
      <h1>Stay Updated with Our Sermons</h1>
      <p className="mt-4">{`Subscribe now to receive the latest sermon updates and inspiring messages directly to your inbox.`}</p>
      <div className="flex gap-4 mt-6">
        <Button>Subscribe</Button>
        <Button variant={"outline"}>Learn More</Button>
      </div>
    </div>
  );
}

export default JoinUs;
