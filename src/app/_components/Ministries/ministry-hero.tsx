import React from "react";

function MinistryHero() {
  return (
    <div className="mx-auto h-[369px] bg-[url('/ministry/hero2.JPG')]  bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center px-16 py-12 relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="text-5xl text-white relative z-10 max-w-[700px] text-center">
        Our Church Ministries
      </h1>
      <p className="mt-6 text-white relative z-10 text-center max-w-[700px]">
        Explore the diverse ministries that foster community, growth, and
        spiritual connection at our church.
      </p>
    </div>
  );
}

export default MinistryHero;
