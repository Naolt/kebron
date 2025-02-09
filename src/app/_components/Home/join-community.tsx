import { Button } from "@/components/ui/button";
import React from "react";

function JoinCommunity() {
  return (
    <div className="max-w-screen-3xl mx-auto h-[450px] bg-[url('/home/prayer2.jpg')] bg-cover bg-center bg-no-repeat flex flex-col justify-center items-left px-16 py-12 relative">
      <div className="absolute inset-0 bg-black/50"></div>

      <h1 className="text-5xl text-white relative z-10 max-w-[700px]">
        Get Involved Today
      </h1>
      <p className="mt-6 text-white relative z-10">
        At Kebron International Church, we invite you to be a part of our
        growing family.
      </p>
      <div className="flex gap-4 mt-8 relative z-10">
        <Button variant={"outline"}>Contact Us</Button>
        <Button
          variant={"outline"}
          className="bg-transparent text-white border-white"
        >
          Donate/Give
        </Button>
      </div>
    </div>
  );
}

export default JoinCommunity;
