import { getLiveStreamServer } from "@/actions/action";
import { FadeInView } from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Contact } from "@/models/contact";
import Link from "next/link";
import React from "react";
import { LiveStreamResponse } from "@/types";
import LivestreamList from "./livestream-list";
// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";
const itemsPerPage = 6;

async function OurLiveStream({ contactInfo }: { contactInfo: Contact }) {
  const livestreams: LiveStreamResponse = await getLiveStreamServer({
    page: 1,
    limit: itemsPerPage,
  });

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
      <LivestreamList
        initialItems={livestreams.items}
        totalItems={livestreams.total}
        itemsPerPage={itemsPerPage}
        currentPage={livestreams.currentPage}
      />
    </section>
  );
}

export default OurLiveStream;
