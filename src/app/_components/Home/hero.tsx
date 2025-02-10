"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function Hero() {
  const IMAGES = ["hero1.JPG", "hero2.JPG", "hero3.JPG"];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [IMAGES.length]);

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
            src={`/home/${IMAGES[currentIndex]}`}
            alt="Hero Image"
            width={1920}
            height={1080}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-32 right-8 flex gap-2 z-10">
        {IMAGES.map((_, index) => (
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
        <div className="flex flex-col px-16 py-12 gap-8 text-white">
          <h1 className="font-bold max-w-[600px] text-64px leading-tight">
            Welcome to Kebron International Church
          </h1>
          <p className="text-3xl  font-light">Rüsselsheim / Germany</p>
          <p className="text-lg max-w-[660px]">
            With great power the apostles continued to testify to the
            resurrection of the Lord Jesus. And God&apos;s grace was so
            powerfully at work in them all.
          </p>
          <p className="text-lg max-w-[660px]">Acts 4:33</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
