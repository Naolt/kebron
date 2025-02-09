import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function getSermons() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/sermons`,
    {
      next: {
        tags: ["sermons"],
        revalidate: 60, // Cache for 60 seconds
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sermons");
  }

  return response.json();
}

async function OurWebinars() {
  const sermons = await getSermons();

  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <div className="flex justify-between gap-8 w-full">
        <div className="flex flex-col max-w-[768px]">
          <span className="font-semibold">live stream</span>
          <h1 className="mt-4">Join Us Live On Facebook!</h1>
          <p className="mt-6">
            {`Join us this Sunday and experience the power of worship and the life-changing truth of the Gospel!`}
          </p>
        </div>
        <div className="flex justify-center self-end">
          <Link href="/join-us" className="">
            <Button variant={"outline"}>View All</Button>
          </Link>
        </div>
      </div>
      <Cards sermons={sermons} />
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
      {sermons.map((sermon, index) => (
        <div
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
        </div>
      ))}
    </div>
  );
}

export default OurWebinars;
