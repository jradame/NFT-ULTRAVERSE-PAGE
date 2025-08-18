import React from "react";
import LandingIntro from "../components/home/LandingIntro";
import HotCollections from "../components/home/HotCollections";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  return (
    <div>
      <LandingIntro />
      <HotCollections />
      <NewItems />
      <TopSellers />
    </div>
  );
};

export default Home;




