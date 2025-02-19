import React from "react";

function Moto() {
  return (
    <section className="bg-black text-white text-center px-4 sm:px-8 lg:px-16 py-12 shadow-lg max-w-screen-2xl mx-auto">
      <div className="flex flex-col items-center">
        <div className="text-6xl mb-4">
          <i className="fas fa-quote-left"></i>
        </div>
        <h2 className="text-3xl font-extrabold mb-4">
          “There is abundant power and grace <br />
          in the house of the lord!”
        </h2>
      </div>
      <p className="text-lg italic">
        Embrace the spirit of community and faith.
      </p>
    </section>
  );
}

export default Moto;
