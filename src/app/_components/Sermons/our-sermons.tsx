import { getSermonsServer } from "@/actions/action";
import { FadeInView } from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import { Contact } from "@/models/contact";
import { SermonResponse } from "@/types";
import Link from "next/link";
import React from "react";
import SermonList from "./sermon-list";

const itemsPerPage = 2;

// Add revalidation tag
export const revalidate = 0; // Make the page dynamic

// Add dynamic rendering option
export const dynamic = "force-dynamic";

async function OurSermons({ contactInfo }: { contactInfo: Contact }) {
  const sermons: SermonResponse = await getSermonsServer({
    page: 1,
    limit: itemsPerPage,
  });

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
      <SermonList
        initialItems={sermons.items}
        totalItems={sermons.total}
        itemsPerPage={itemsPerPage}
        currentPage={sermons.currentPage}
      />
      {/*//  link*/}
      <div className="w-full flex justify-center ">
        <Link href={contactInfo.socialLinks?.youtube || "#"} className="">
          <Button variant={"outline"}>View All</Button>
        </Link>
      </div>
    </section>
  );
}

export default OurSermons;
