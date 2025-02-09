import { Button } from "@/components/ui/button";
import { Facebook } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

type TeamMemberType = {
  picture: string;
  fullName: string;
  role: string;
  description: string;
  socials: {
    icon: React.ReactNode;
    href: string;
  }[];
};

const TEAM_MEMBERS: TeamMemberType[] = [
  {
    picture: "https://picsum.photos/200/200",
    fullName: "John Doe",
    role: "CEO",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Jane Smith",
    role: "Lead Pastor",
    description:
      "Dedicated to serving our community through faith and leadership.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Michael Johnson",
    role: "Youth Minister",
    description: "Passionate about guiding and mentoring our young members.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Sarah Williams",
    role: "Music Director",
    description: "Leading our worship through the power of music and song.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Robert Brown",
    role: "Community Outreach",
    description:
      "Coordinating our efforts to serve and support our local community.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Emily Davis",
    role: "Children's Ministry",
    description: "Creating engaging programs for our youngest church members.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "David Wilson",
    role: "Administrative Director",
    description: "Ensuring smooth operations of our church's daily activities.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
  {
    picture: "https://picsum.photos/200/200",
    fullName: "Lisa Anderson",
    role: "Care Ministry",
    description: "Providing pastoral care and support to our congregation.",
    socials: [
      {
        icon: <Facebook />,
        href: "https://facebook.com",
      },
      {
        icon: <Twitter />,
        href: "https://twitter.com",
      },
      {
        icon: <Linkedin />,
        href: "https://linkedin.com",
      },
    ],
  },
];

function OurTeam() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20">
      {/* heading section */}
      <div className="flex flex-col items-center max-w-2xl mx-auto">
        <span className="font-semibold text-sm sm:text-base">Together</span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center mt-2 sm:mt-4">
          Our Team
        </h1>
        <p className="text-center mt-3 sm:mt-4 text-sm sm:text-base">
          Meet the dedicated individuals behind our community.
        </p>
      </div>

      {/* team members list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mt-12 sm:mt-16">
        {TEAM_MEMBERS.map((member) => (
          <TeamMember key={member.fullName} member={member} />
        ))}
      </div>

      {/* join our team */}
      <div className="flex flex-col items-center mt-12 sm:mt-16 lg:mt-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl">Join Our Team!</h2>
        <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base">
          Join our team and make a difference today!
        </p>
        <Button variant="outline" className="mt-4 sm:mt-6">
          Get in Touch
        </Button>
      </div>
    </section>
  );
}

function TeamMember({ member }: { member: TeamMemberType }) {
  return (
    <div className="flex flex-col gap-4">
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
      {/* socials */}
      <div className="flex gap-4 justify-center">
        {member.socials.map((social) => (
          <a
            href={social.href}
            key={social.href}
            className="text-muted-foreground hover:text-foreground transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;
