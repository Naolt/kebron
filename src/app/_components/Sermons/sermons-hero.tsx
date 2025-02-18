import React from "react";

function SermonsHero() {
  return (
    <div className="mx-auto h-[369px] bg-[url('/sermons/sunday-service.webp')] bg-cover bg-center bg-no-repeat relative flex items-center">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="max-w-screen-2xl w-full mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <h1 className="text-5xl text-white relative z-10 max-w-[700px] ">
          Inspiring Sermons
        </h1>
        <p className="mt-6 text-white text-lg relative z-10 max-w-[700px]">
          Discover powerful messages that strengthen our faith and unite our
          church community every week.
        </p>
      </div>
    </div>
  );
}

export default SermonsHero;
