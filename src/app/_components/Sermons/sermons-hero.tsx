import React from "react";

function SermonsHero() {
  return (
    <div className="max-w-screen-2xl mx-auto h-[369px] bg-[url('https://picsum.photos/1920/1080')] bg-cover bg-center bg-no-repeat flex flex-col justify-center px-8 md:px-16 py-12 relative">
      <div className="absolute inset-0 bg-black/50"></div>
      <h1 className="text-5xl text-white relative z-10 max-w-[700px] ">
        Inspiring Sermons
      </h1>
      <p className="mt-6 text-white text-lg relative z-10 max-w-[700px]">
        Discover powerful messages that strengthen our faith and unite our
        church community every week.
      </p>
    </div>
  );
}

export default SermonsHero;
