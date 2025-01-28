import { Button } from "@/components/ui/button";
import React from "react";

function JoinCommunity() {
  return (
    <div className="max-w-screen-2xl mx-auto h-[450px] bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-left px-8 py-12 relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="text-5xl text-white relative z-10 max-w-[700px]">
        Join Our Vibrant Church Community
      </h1>
      <p className="mt-6 text-white relative z-10">
        Experience faith, fellowship, and inspiration. Join us this Sunday for a
        transformative worship service.
      </p>
      <div className="flex gap-4 mt-8 relative z-10">
        <Button variant={"outline"}>Join</Button>
        <Button
          variant={"outline"}
          className="bg-transparent text-white border-white"
        >
          Learn More
        </Button>
      </div>
    </div>
  );
}

export default JoinCommunity;
