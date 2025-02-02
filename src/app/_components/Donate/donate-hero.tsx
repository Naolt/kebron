import { BoxIcon, ChevronRight } from "lucide-react";
import React from "react";

const CARD_DATA = [
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Engaging Activities",
    description:
      "From retreats to community service, we create memorable experiences that strengthen faith.",
  },
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Mentorship Programs",
    description:
      "Our mentors guide youth in their spiritual journeys, fostering personal and communal growth.",
  },
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Mentorship Programs",
    description:
      "Our mentors guide youth in their spiritual journeys, fostering personal and communal growth.",
  },
  {
    icon: <BoxIcon className="w-10 h-10" />,
    number: "Mentorship Programs",
    description:
      "Our mentors guide youth in their spiritual journeys, fostering personal and communal growth.",
  },
];

function DonateHero() {
  return (
    <div className="max-w-screen-2xl mx-auto px-8 py-28 grid grid-cols-3 gap-20">
      {/* Left */}
      <div className="flex flex-col lg:col-span-1 col-span-3">
        <span className="font-semibold">Engage</span>
        <h1 className="mt-4">Explore Volunteer Opportunities</h1>
        <p className="max-w-[800px] mt-4">
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.`}
        </p>
        <span className="flex items-center gap-2 mt-4">
          Sign Up
          <ChevronRight />
        </span>
      </div>
      <div className="col-span-3 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
        {CARD_DATA.map((card, index) => (
          <div key={index} className="flex flex-col gap-4">
            {card.icon}
            <h4 className="text-[20px]">{card.number}</h4>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DonateHero;
