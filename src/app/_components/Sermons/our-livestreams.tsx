import { getLiveStream } from "@/actions/action";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Contact } from "@/models/contact";
import Link from "next/link";
import React from "react";

async function OurLiveStream({ contactInfo }: { contactInfo: Contact }) {
  let livestreams: Livestream[] | null = await getLiveStream();

  if (!livestreams) {
    livestreams = [];
  }

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}

      <div className="flex justify-between gap-8 w-full">
        <FadeInView className="flex flex-col max-w-[768px]">
          <span className="font-semibold">live stream</span>
          <h1 className="mt-4">Join Us Live On Facebook!</h1>
          <p className="mt-6">
            {`Join us this Sunday and experience the power of worship and the life-changing truth of the Gospel!`}
          </p>
        </FadeInView>
        <FadeInView className="flex justify-center self-end">
          <Link href={contactInfo.socialLinks?.facebook || "#"} className="">
            <Button variant={"outline"}>View All</Button>
          </Link>
        </FadeInView>
      </div>
      <Cards livestreams={livestreams} />
    </section>
  );
}

type Livestream = {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
};

function Cards({ livestreams }: { livestreams: Livestream[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
      {livestreams.map((livestream, index) => (
        <StaggerItem
          className="flex flex-col col-auto mx-auto border-2 w-full"
          key={index}
        >
          {/* Video Player */}

          <div className="aspect-video ">
            <iframe
              src={livestream.embedUrl}
              className="w-full h-full "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export default OurLiveStream;
