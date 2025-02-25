"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function Hero() {
  const SLIDES = [
    {
      image: "hero1.JPG",
      title: "Welcome to Kebron International Church",
      location: "Rüsselsheim / Germany",
      verse:
        "With great power the apostles continued to testify to the resurrection of the Lord Jesus. And God's grace was so powerfully at work in them all.",
      reference: "Acts 4:33",
      lang: "en",
    },
    {
      image: "hero4.JPG",
      title: "እንኳን ወደ ኬብሮን ዓለም አቀፍ ቤተክርስቲያን በደህና መጡ",
      location: "ሮሳላሰይም / ጀርመን",
      verse:
        "ሐዋርያትም የጌታን የኢየሱስን ትንሣኤ በታላቅ ኃይል ይመሰክሩ ነበር፤ በሁላቸውም ላይ ታላቅ ጸጋ ነበረ።",
      reference: "የሐዋርያት ሥራ 4:33",
      lang: "am",
    },
    {
      image: "hero5.JPG",
      title: "Willkommen in der Kebron International Church",
      location: "Rüsselsheim / Deutschland",
      verse:
        "Mit großer Kraft legten die Apostel Zeugnis ab von der Auferstehung Jesu, des Herrn, und reiche Gnade ruhte auf ihnen allen.",
      reference: "Apostelgeschichte 4:33",
      lang: "de",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-screen-3xl mx-auto relative h-[710px] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 1000 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -1000 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={`/home/${SLIDES[currentIndex].image}`}
            alt="Hero Image"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-16 right-8 flex gap-2 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentIndex === index ? "bg-white w-6" : "bg-white/50"
            )}
          />
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/100 to-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col px-4 sm:px-8 lg:px-16 py-12 gap-8 text-white"
          >
            <h1
              className={cn(
                "font-bold max-w-[600px] text-4xl lg:text-[64px] leading-tight",
                SLIDES[currentIndex].lang === "am" && "font-ethiopian"
              )}
            >
              {SLIDES[currentIndex].title}
            </h1>
            <p className="text-xl lg:text-3xl font-light">
              {SLIDES[currentIndex].location}
            </p>
            <p
              className={cn(
                "text-base lg:text-lg max-w-[660px]",
                SLIDES[currentIndex].lang === "am" && "font-ethiopian"
              )}
            >
              {SLIDES[currentIndex].verse}
            </p>
            <p
              className={cn(
                "text-base lg:text-lg max-w-[660px]",
                SLIDES[currentIndex].lang === "am" && "font-ethiopian"
              )}
            >
              {SLIDES[currentIndex].reference}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Hero;
