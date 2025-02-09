import { Button } from "@/components/ui/button";
import React from "react";

function JoinUs() {
  return (
    <div className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28 flex flex-col items-center justify-center">
      <h1>Stay Updated with Our Sermons</h1>
      <p className="mt-4">{`Subscribe now to receive the latest sermon updates and inspiring messages directly to your inbox.`}</p>
      <div className="flex gap-4 mt-6">
        <Button>Join Us</Button>
      </div>
    </div>
  );
}

export default JoinUs;
