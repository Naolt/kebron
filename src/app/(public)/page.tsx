import Hero from "../_components/Home/hero";
import JoinCommunity from "../_components/Home/join-community";
import JoinUs from "../_components/Home/join-us";
import OurImpact from "../_components/Home/our-impact";
import OurEthos from "../_components/Home/our-ethos";
import OurProgram from "../_components/Home/our-program";
import Moto from "../_components/Home/moto";
export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Moto />
      <OurEthos />
      <OurProgram />
      <JoinUs />
      <OurImpact />
      <JoinCommunity />
    </div>
  );
}
