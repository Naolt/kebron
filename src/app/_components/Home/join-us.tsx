import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function JoinUs() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[800px]">
        <span className="font-semibold">Connect</span>
        <h1 className="text-center mt-4">
          Experience Faith, Worship & Community
        </h1>
        <p className="max-w-[800px] text-center mt-4">
          {`A place of worship, transformation, and community.`}
        </p>
      </div>
      <Cards />
    </section>
  );
}

const CARDS = [
  {
    image: "/home/live.JPG",
    title: "Our Ministries",
    description:
      "Join us from anywhere in the world through our high-quality livestream services.",

    link: {
      text: "Learn More",
      href: "/ministries",
    },
  },

  {
    image: "/home/hero3.JPG",
    title: "Sermons & Worship",
    description:
      "Engage in spirit-filled worship and inspiring messages that bring biblical truth to life. Join us in person or watch online anytime.",
    link: {
      text: "Watch Now",
      href: "/sermons",
    },
  },

  {
    image: "/home/wedding.JPG",
    title: "Gallery",
    description:
      "See how God is moving in our church! Browse moments of worship, fellowship, and outreach captured through powerful images.",
    link: {
      text: "View Gallery",
      href: "/gallery",
    },
  },
];

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
      {CARDS.map((card, index) => (
        <div className="flex flex-col  overflow-hidden border" key={index}>
          <div className="relative w-full h-[250px]">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col flex-1 p-6">
            <h3 className="text-2xl font-semibold text-center mb-4">
              {card.title}
            </h3>
            <p className="text-center text-gray-600 flex-1 mb-6">
              {card.description}
            </p>
            <div className="flex justify-center">
              <Link href={card.link.href}>
                <Button variant="ghost" className="hover:bg-gray-100">
                  {card.link.text}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default JoinUs;
