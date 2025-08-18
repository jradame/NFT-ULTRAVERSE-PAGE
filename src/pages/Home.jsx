import React from "react";
import LandingIntro from "../components/home/LandingIntro";
import HotCollections from "../components/home/HotCollections";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  return (
    <div>
      <LandingIntro />
      <HotCollections />
      <TopSellers />
    </div>
  );
};

export default Home;



