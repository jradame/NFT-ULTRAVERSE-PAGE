import React from "react";
import NewItems from "../components/home/NewItems"; // Or ExploreItems

const Explore = () => {
  return (
    <section style={{ padding: "60px 0" }}>
      <div className="container">
        <h2 className="text-center mb-5">Explore Items</h2>
        <NewItems />
      </div>
    </section>
  );
};

export default Explore;
