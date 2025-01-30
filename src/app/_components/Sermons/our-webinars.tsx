import { Button } from "@/components/ui/button";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OurWebinars() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex justify-between gap-8 w-full">
        <div className="flex flex-col max-w-[768px]">
          <span className="font-semibold">Webinars</span>
          <h1 className="mt-4">Latest Online Sessions</h1>
          <p className="mt-6">
            {`Join us for engaging webinars that enrich your faith and equip you for service.`}
          </p>
        </div>
        <div className="flex justify-center self-end">
          <Link href="/join-us" className="">
            <Button variant={"outline"}>View All</Button>
          </Link>
        </div>
      </div>
      <Cards />
    </section>
  );
}

type CardType = {
  thumbnail: string;
  duration: string;
  link: string;
};

const CARDS: CardType[] = [
  {
    thumbnail: "https://picsum.photos/400/300?random=1",
    duration: "45 minutes",
    link: "/sermons/grace-in-difficult-times",
  },
  {
    thumbnail: "https://picsum.photos/400/300?random=2",
    duration: "38 minutes",
    link: "/sermons/walking-in-faith",
  },
  {
    thumbnail: "https://picsum.photos/400/300?random=3",
    duration: "42 minutes",
    link: "/sermons/power-of-community",
  },
];

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-20">
      {CARDS.map((card, index) => (
        <div
          className="flex flex-col col-auto max-w-[400px] mx-auto"
          key={index}
        >
          <Image
            src={card.thumbnail}
            alt={card.link}
            width={400}
            height={240}
            className="object-cover"
          />
          <span className="flex items-center gap-2 mt-6 text-sm">
            <Clock className="w-6 h-6" /> {card.duration}
          </span>
          <Link href="/join-us" className="flex items-center gap-2 mt-4">
            View Event <ChevronRight className="w-4 h-4" />
          </Link>
          {/*<h3 className="text-3xl text-center mt-8">{card.title}</h3>*/}
          {/*<p className="text-center mt-4">{card.description}</p>*/}
        </div>
      ))}
    </div>
  );
}

export default OurWebinars;
