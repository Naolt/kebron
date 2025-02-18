import Hero from "../_components/Home/hero";
import JoinCommunity from "../_components/Home/join-community";
import JoinUs from "../_components/Home/join-us";
import OurImpact from "../_components/Home/our-impact";
import OurEthos from "../_components/Home/our-ethos";
import OurProgram from "../_components/Home/our-program";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <section className="bg-black text-white text-center py-12 shadow-lg max-w-screen-2xl mx-auto">
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
      <OurEthos />
      <OurProgram />
      <JoinUs />
      <OurImpact />
      <JoinCommunity />
    </div>
  );
}
