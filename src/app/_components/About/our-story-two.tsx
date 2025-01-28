import Image from "next/image";
import React from "react";

function OurStoryTwo() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col lg:flex-row gap-20 justify-between items-center">
        <div className="flex flex-col mx-auto">
          <span className="font-semibold">Growth</span>
          <h1 className="mt-4">
            Celebrating Our Impact and Community Engagement
          </h1>
          <p className="max-w-[800px] mt-6">
            {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`}
          </p>
        </div>
        {/* image section */}
        <Image
          src={"https://picsum.photos/600/600"}
          width={616}
          height={640}
          alt="Our Impact"
        />
      </div>
    </section>
  );
}

export default OurStoryTwo;
