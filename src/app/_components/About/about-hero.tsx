import React from "react";

function AboutHero() {
  return (
    <div className="max-w-screen-3xl mx-auto py-20 px-4 sm:px-8 lg:px-16 h-[400px] overflow-hidden bg-[url('/home/hero1.JPG')]  bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="text-5xl text-white relative z-10 max-w-[700px] text-center">
        About Us
      </h1>
      <p className="mt-6 text-white relative z-10 text-center">
        There is abundant power and grace in the house of the lord!
      </p>
    </div>
  );
}
export default AboutHero;
