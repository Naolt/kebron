import Image from "next/image";
import React from "react";

function AboutHero() {
  return (
    <div className="max-w-screen-2xl mx-auto py-20 px-8">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="About Hero"
        width={1920}
        height={1080}
        className={"w-full h-[640px] object-cover"}
      />
    </div>
  );
}

export default AboutHero;
