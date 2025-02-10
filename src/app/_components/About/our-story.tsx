import { FadeInView } from "@/components/animations/motion-wrapper";
import Image from "next/image";
import React from "react";

function OurStory() {
  return (
    <section className="max-w-screen-3xl mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-28">
      <FadeInView>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
          {/* left image */}
          <div className="w-full lg:w-1/2">
            <Image
              src="/about/birthday.JPG"
              alt="Our Story"
              width={1920}
              height={1080}
              className="w-full h-[400px] sm:h-[500px] lg:h-[640px] object-cover"
            />
          </div>

          {/* right story section */}
          <div className="flex flex-col gap-6 lg:gap-8 lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
            <div className="text-gray-600 space-y-4 text-base sm:text-lg">
              <p>
                {`Located in Rüsselsheim, Germany, just 27 km from Frankfurt, Kebron
              International Church is more than a place of worship—it's a family
              of faith. We come together to pray, learn scripture, preach the
              gospel, and worship. Living far from our relatives, we support and
              uplift each other through both joyful and challenging times.`}
              </p>
              <p>
                {` Founded in February 2019 by Pastor Wondwossen and his wife, Kebron
              began with a small group of believers who embraced the vision.
              Since then, we have grown in faith and mission, witnessing God's
              incredible work in our lives.`}
              </p>
              <p>
                {` At Kebron, we don't just focus on spiritual activities; we operate
              by great faith, believing that God alone transforms lives. Through
              preaching the gospel, we have seen lives changed, marriages
              restored, hearts healed, and broken families mended.`}
              </p>
              <p>
                {`  We are passionate about spreading the gospel across Germany,
              reaching cities like Frankfurt, Mainz, Rüsselsheim, Darmstadt,
              Duisburg, and Düsseldorf. As partners of the United Gospel
              Campaign, we share God's message every quarter. Our young and
              energetic preachers bring the gospel to life in fresh and creative
              ways, while our media team reaches thousands through social media.`}
              </p>
              <p>
                {` At Kebron, we welcome you with open arms—because here, you are
              family.`}
              </p>
            </div>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}

export default OurStory;
