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
    picture: "https://picsum.photos/200/200",
    fullName: "John Doe",
    role: "CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Jane Smith",
    role: "Lead Pastor",
    description:
      "Dedicated to serving our community through faith and leadership.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Michael Johnson",
    role: "Youth Minister",
    description: "Passionate about guiding and mentoring our young members.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Sarah Williams",
    role: "Music Director",
    description: "Leading our worship through the power of music and song.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Robert Brown",
    role: "Community Outreach",
    description:
      "Coordinating our efforts to serve and support our local community.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Emily Davis",
    role: "Children's Ministry",
    description: "Creating engaging programs for our youngest church members.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "David Wilson",
    role: "Administrative Director",
    description: "Ensuring smooth operations of our church's daily activities.",
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Lisa Anderson",
    role: "Care Ministry",
    description: "Providing pastoral care and support to our congregation.",
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
        {TEAM_MEMBERS.map((member) => (
          <TeamMember key={member.fullName} member={member} />
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
          <p className="font-semibold text-lg sm:text-xl text-center">
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
