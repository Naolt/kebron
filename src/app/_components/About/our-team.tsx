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
    <section className="max-w-screen-2xl mx-auto px-8 py-28 flex flex-col gap-20">
      {/* heading section */}
      <div className="flex flex-col mx-auto items-center max-w-[768px]">
        <span className="font-semibold">Together</span>
        <h1 className="text-center mt-4">Our Team</h1>
        <p className="max-w-[800px] text-center mt-4">
          {`Meet the dedicated individuals behind our community.`}
        </p>
      </div>

      {/* team members list */}
      <div className="flex flex-wrap gap-12 justify-center">
        {TEAM_MEMBERS.map((member) => (
          <TeamMember key={member.fullName} member={member} />
        ))}
      </div>

      {/*  join our team */}

      <div className="flex flex-col items-center justify-center">
        <h1>Join Our Team!</h1>
        <p className="mt-4">{`Join our team and make a difference today!`}</p>
        <Button variant={"outline"} className="mt-6">
          Keep in Touch
        </Button>
      </div>
    </section>
  );
}

function TeamMember({ member }: { member: TeamMemberType }) {
  return (
    <div className="flex flex-col w-[304px] gap-4 items-center justify-center">
      <Image
        src={member.picture}
        alt={member.fullName}
        width={1920}
        height={1080}
        className="w-[304px] h-[296px] object-cover"
      />
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-center font-semibold text-[20px]">
            {member.fullName}
          </p>
          <p className="text-center">{member.role}</p>
        </div>
        <p className="text-center">{member.description}</p>
      </div>
      {/* socials */}
      <div className="flex gap-4 flex-wrap">
        {member.socials.map((social) => (
          <a href={social.href} key={social.href}>
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default OurTeam;
