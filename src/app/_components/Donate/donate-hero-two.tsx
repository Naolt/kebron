import { FadeInView } from "@/components/animations/motion-wrapper";
import Image from "next/image";
import React from "react";

function DonateHeroTwo() {
  return (
    <FadeInView className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
        {/* Content section */}
        <div className="w-full lg:w-1/2 max-w-[616px]">
          <h1>{`Why Give?`}</h1>
          <div className="flex flex-col gap-6 mt-8">
            <p>
              {`At Kebron International Church, giving is an act of worship,
              faith, and obedience. Your generosity enables us to spread the
              Gospel, serve those in need, and make a lasting impact in our
              community and beyond.`}
            </p>
            <p>
              {`Support the Church's Mission – Your giving helps us share the
              Gospel, disciple believers, and expand God's Kingdom.`}
            </p>
            <p>
              {`Make a Difference in Lives – Through your generosity, we provide
              essential support such as food, clothing, and outreach programs
              for those in need. Empower the Next Generation – Invest in youth
              and children's ministries, equipping them with faith and
              leadership for the future.`}
            </p>
            <p>
              {`Enhance Worship & Ministry Efforts – Your donations help us
              improve church facilities, media outreach, and worship
              experiences.`}
            </p>
          </div>
        </div>

        {/* Image section */}
        <div className="w-full lg:w-1/2 max-w-[616px]">
          <Image
            src={"/donate/community1.jpg"}
            alt="Contact Us"
            width={1920}
            height={1080}
            className="w-full h-[400px] lg:h-[640px] object-cover rounded-lg"
          />
        </div>
      </div>
    </FadeInView>
  );
}

export default DonateHeroTwo;
