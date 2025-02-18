import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";
import { BookOpenIcon, FlameIcon, HeartHandshakeIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const CORE_VALUES = [
  {
    icon: <BookOpenIcon />,
    description:
      "The Word of God – Our foundation and guide for life (Hebrews 4:12).",
  },
  {
    icon: <FlameIcon />,
    description:
      "The Holy Spirit – Our teacher and source of strength (John 14:26).",
  },
  {
    icon: <HeartHandshakeIcon />,
    description:
      "Unity & Brotherly Love – A calling to genuine, Christ-like love (1 Peter 1:22).",
  },
];
function OurCoreValues() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-20">
      {/* heading section */}
      <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-20 justify-between">
        <div className="flex flex-col flex-1">
          <FadeInView>
            <span className="font-semibold text-sm sm:text-base">Values</span>
          </FadeInView>

          <FadeInView>
            <h1 className="mt-2 sm:mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Our Core Values
            </h1>
          </FadeInView>

          <FadeInView>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base text-muted-foreground max-w-prose">
              We are a community of believers who are passionate about sharing
              the love of Jesus Christ with our community.
            </p>
          </FadeInView>

          <StaggerContainer className="flex flex-col gap-4 sm:gap-6 mt-6 sm:mt-8">
            {CORE_VALUES.map((value) => (
              <StaggerItem
                key={value.description}
                className="flex items-start sm:items-center gap-3 sm:gap-4"
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-primary">
                  {value.icon}
                </div>
                <p className="text-sm sm:text-base">{value.description}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* image section */}
        <div className="relative aspect-square w-full lg:w-[45%] max-w-xl">
          <Image
            src="/about/girl_praying.jpg"
            fill
            alt="Our Impact"
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}

export default OurCoreValues;
