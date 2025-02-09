import React from "react";

function AboutHero() {
  return (
    <div className="max-w-screen-3xl mx-auto py-20 px-16 h-[500px] overflow-hidden bg-[url('/home/hero1.jpg')]  bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="text-5xl text-white relative z-10 max-w-[700px] text-center">
        About Us
      </h1>
      <p className="mt-6 text-white relative z-10 text-center">
        We are a community of believers who are passionate about sharing the
        love of Jesus Christ with our community.
      </p>
    </div>
  );
}

export default AboutHero;
