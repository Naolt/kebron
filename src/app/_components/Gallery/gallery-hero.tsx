import { FadeInView } from "@/components/animations/motion-wrapper";
import React from "react";

function GalleryHero() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto h-[369px] flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-12 relative">
      {/*<div className="absolute inset-0 bg-black/50"></div>*/}
      <span className="font-semibold  z-10">Gallery</span>
      <h1 className="text-5xl  relative z-10 max-w-[700px] mt-4 ">
        Explore Our Gallery
      </h1>
      <p className="mt-6  text-lg relative z-10 max-w-[700px]">
        Discover powerful messages that strengthen our faith and unite our
        church community every week.
      </p>
    </FadeInView>
  );
}

export default GalleryHero;
