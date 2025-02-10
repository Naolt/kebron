import { getSermons } from "@/actions/action";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Contact } from "@/models/contact";
import Link from "next/link";
import React from "react";

async function OurSermons({ contactInfo }: { contactInfo: Contact }) {
  let sermons: Sermon[] | null = await getSermons();

  if (!sermons) {
    sermons = [];
  }

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <FadeInView className="flex flex-col mx-auto items-center max-w-[768px]">
        <span className="font-semibold">Sermons</span>
        <h1 className="text-center mt-4">
          Experience Powerful Worship & Life-Changing Messages
        </h1>
        <p className="text-center mt-6">
          {`Missed a service? You can watch or listen to past sermons online and stay connected with God’s Word wherever you are.`}
        </p>
      </FadeInView>
      {/*// cards*/}
      <Cards sermons={sermons} />
      {/*//  link*/}
      <div className="w-full flex justify-center ">
        <Link href={contactInfo.socialLinks?.youtube || "#"} className="">
          <Button variant={"outline"}>View All</Button>
        </Link>
      </div>
    </section>
  );
}

type Sermon = {
  _id: string;
  title: string;
  videoUrl: string;
  embedUrl: string;
};

function Cards({ sermons }: { sermons: Sermon[] }) {
  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
      {sermons.map((sermon, index) => (
        <StaggerItem
          className="flex flex-col col-auto mx-auto border-2 w-full"
          key={index}
        >
          {/* Video Player */}

          <div className="aspect-video ">
            <iframe
              src={sermon.embedUrl}
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

export default OurSermons;
