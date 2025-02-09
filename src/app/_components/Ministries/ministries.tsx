import Image from "next/image";
import React from "react";

function Ministries() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[800px]">
        <span className="font-semibold">Connect</span>
        <h1 className="text-center mt-4">
          Discover Our Dynamic Church Ministries
        </h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Empowered to Serve, Called to Impact`}
        </p>
      </div>
      <Cards />
    </section>
  );
}

const CARDS = [
  {
    image: "/home/live.JPG",
    title: "🎥 Livestream Ministry",
    description:
      "Join us from anywhere in the world through our high-quality livestream services.",

    link: {
      text: "Learn More",
      href: "/ministries",
    },
  },

  {
    image: "/home/hero3.JPG",
    title: "Kids’ Ministry",
    description:
      "We are passionate about raising the next generation in Christ.",
    link: {
      text: "Watch Now",
      href: "/sermons",
    },
  },

  {
    image: "/home/wedding.JPG",
    title: "Outreach Programs",
    description:
      "As a church, we are dedicated to making a lasting impact by providing essential support, sharing God’s love, and spreading the Gospel through outreach, evangelism, and missions across Germany and beyond.",
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default Ministries;
