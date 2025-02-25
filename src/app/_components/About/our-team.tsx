import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TeamMemberType = {
  picture: string;
  fullName: string;
  role: string;
  description: string;
};

const TEAM_MEMBERS: TeamMemberType[] = [
  {
    picture: "/teams/Wondwossen_Tadesse_Pastor.jpg",
    fullName: "Wondwossen Tadesse",
    role: "Pastor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    picture: "/teams/Liya_solomon_Preacher.jpg",
    fullName: "Liya Solomon",
    role: "Preacher",
    description:
      "Dedicated to serving our community through faith and leadership.",
  },
  {
    picture: "/teams/Robel_Preacher.jpg",
    fullName: "Robel",
    role: "Preacher",
    description: "Leading our worship through the power of music and song.",
  },
  {
    picture: "/teams/Yoni_Preacher.jpg",
    fullName: "Yonatan",
    role: "Preacher",
    description: "Providing pastoral care and support to our congregation.",
  },
  {
    picture: "/teams/Yordanos_Yohannes_worship_leader.jpg",
    fullName: "Yordanos Yohannes",
    role: "Worship Leader",
    description: "Providing pastoral care and support to our congregation.",
  },
  {
    picture: "/teams/Efrata_Melaku_Holy_communion_organizer.jpg",
    fullName: "Efrata Melaku",
    role: "Holy Communion Organizer",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    picture: "/teams/Wudnesh_Adamu_Children_ministry_and_Teacher.jpg",
    fullName: "Wudnesh Adamu",
    role: "Children's Ministry and Teacher",
    description:
      "Coordinating our efforts to serve and support our local community.",
  },
  {
    picture: "/teams/Luwam_Kasaye_Event_Organizer.webp",
    fullName: "Luwam Kasaye",
    role: "Event Organizer",
    description: "Ensuring smooth operations of our church's daily activities.",
  },
  {
    picture: "/teams/Sunday_Service_Opining_prayer_team.webp",
    fullName: "Sunday Service Opening Prayer Team",
    role: "Sunday Service Opening Prayer Team",
    description: "Ensuring smooth operations of our church's daily activities.",
  },
  {
    picture: "/teams/Media_team.jpg",
    fullName: "Media Team",
    role: "Media Team",
    description: "Passionate about guiding and mentoring our young members.",
  },
];

function OurTeam() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20">
      {/* heading section */}

      <FadeInView>
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <span className="font-semibold text-sm sm:text-base">Together</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center mt-2 sm:mt-4">
            Our Team
          </h1>
          <p className="text-center mt-3 sm:mt-4 text-sm sm:text-base">
            Meet the dedicated individuals behind our community.
          </p>
        </div>
      </FadeInView>

      {/* team members list */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16">
        {TEAM_MEMBERS.map((member, index) => (
          <TeamMember key={index} member={member} />
        ))}
      </StaggerContainer>

      {/* join our team */}
      <FadeInView>
        <div className="flex flex-col items-center mt-12 sm:mt-16 lg:mt-20">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl">Join Our Team!</h2>
          <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base">
            Join our team and make a difference today!
          </p>
          <Link href={"/contact"}>
            <Button variant="outline" className="mt-4 sm:mt-6">
              Get in Touch
            </Button>
          </Link>
        </div>
      </FadeInView>
    </section>
  );
}

function TeamMember({ member }: { member: TeamMemberType }) {
  return (
    <StaggerItem className="flex flex-col gap-4">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={member.picture}
          alt={member.fullName}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <p className="font-semibold text-lg sm:text-xl text-center max-w-[250px] mx-auto">
            {member.fullName}
          </p>
          <p className="text-sm sm:text-base text-center text-muted-foreground">
            {member.role}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export default OurTeam;
