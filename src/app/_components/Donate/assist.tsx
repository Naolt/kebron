import Image from "next/image";
import React from "react";

function Assist() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 py-20">
      <div className="flex flex-col mx-auto items-center">
        <span className="font-semibold">Engage</span>
        <h1 className="text-center">Assist Our Congregation</h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
        </p>
      </div>

      {/* cards */}
      <Cards />
    </section>
  );
}

const CARD_DATA = [
  {
    image: "https://picsum.photos/1920/1080?random=1",
    tagline: "Volunteer",
    title: "Explore Volunteer Opportunities",
    description:
      "Join our dedicated team of volunteers who serve our community through various outreach programs and events.",
    link: {
      label: "Learn More",
      link: "/volunteer",
    },
  },
  {
    image: "https://picsum.photos/1920/1080?random=2",
    tagline: "Give",
    title: "Support Our Mission",
    description:
      "Your generous donations help us maintain our facilities, run programs, and extend our community outreach efforts.",
    link: {
      label: "Donate Now",
      link: "/donate",
    },
  },
  {
    image: "https://picsum.photos/1920/1080?random=3",
    tagline: "Participate",
    title: "Join Church Activities",
    description:
      "Get involved in our various church activities, from Bible studies to community service projects and social gatherings.",
    link: {
      label: "View Calendar",
      link: "/events",
    },
  },
];

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {CARD_DATA.map((card, index) => (
        <div key={index} className="flex flex-col gap-4 border">
          {card.image && (
            <Image
              src={card.image}
              alt={card.title}
              width={400}
              height={300}
              className="w-full h-[200px] object-cover "
            />
          )}
          <div className="flex flex-col gap-4 p-8">
            <span className="font-semibold">{card.tagline}</span>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <a
              href={card.link.link}
              className="flex items-center gap-2 mt-auto"
            >
              {card.link.label}
              <span>→</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Assist;
