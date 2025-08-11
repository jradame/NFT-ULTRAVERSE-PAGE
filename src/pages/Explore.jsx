import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExploreData();
  }, []);

  const fetchExploreData = async () => {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      const data = await response.json();
      // Return 16 items as requested
      setExploreData(data.slice(0, 16));
    } catch (error) {
      console.error("Failed to fetch explore data:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems exploreData={exploreData} loading={loading} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
