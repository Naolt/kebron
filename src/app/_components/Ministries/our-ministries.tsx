import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function OurMinistries() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-28">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center">
        <span className="font-semibold">Connect</span>
        <h1 className="text-center">Discover Our Dynamic Church Ministries</h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Our ministries are designed to foster community and spiritual growth. Join us as we serve, learn, and connect with one another.`}
        </p>
      </div>
      {/*// cards*/}
      <Cards />
      {/*//  link*/}
      <div className="w-full flex justify-center ">
        <Link href="/join-us" className="">
          <Button variant={"outline"}>Learn More</Button>
        </Link>
        <Link href="/join-us" className="">
          <Button variant={"ghost"}>
            Join <ChevronRight />
          </Button>
        </Link>
      </div>
    </section>
  );
}

const CARDS = [
  {
    image: "https://picsum.photos/400/300",
    title: "Engaging Worship Services Every Week",
    description: "Experience uplifting worship that inspires and connects.",
  },
  {
    image: "https://picsum.photos/400/300",
    title: "Exciting Community Events for Everyone",
    description: "Join us for events that build lasting friendships.",
  },
  {
    image: "https://picsum.photos/400/300",
    title: "Volunteer Opportunities to Make a Difference",
    description:
      "Join us in serving our community and making a positive impact.",
  },
];

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full my-20">
      {CARDS.map((card, index) => (
        <div
          className="flex flex-col col-auto max-w-[400px] mx-auto"
          key={index}
        >
          <Image
            src={card.image}
            alt={card.title}
            width={400}
            height={240}
            className="object-cover"
          />
          <h3 className="text-3xl text-center mt-8">{card.title}</h3>
          <p className="text-center mt-4">{card.description}</p>
        </div>
      ))}
    </div>
  );
}

export default OurMinistries;
