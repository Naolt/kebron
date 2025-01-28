import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Hero Image"
        width={1920}
        height={1080}
        className="w-full h-[710px] object-cover"
      />

      <div className="flex flex-col lg:flex-row px-8 py-12 gap-8">
        <h1 className="font-bold max-w-[600px] text-64px leading-tight">
          Kebron International Church
        </h1>
        <p className="text-lg max-w-[660px]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
      </div>
    </div>
  );
}

export default Hero;
