import React, { useEffect, useState } from "react";
import SubHeader from "../../images/subheader.jpg"; // Fixed path
import ExploreItems from "./ExploreItems"; // Fixed path

const Explore = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(8); // Track displayed count
  const [allData, setAllData] = useState([]); // Store all fetched data

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchExploreData();
  }, []);

  const fetchExploreData = async () => {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      const data = await response.json();
      
      // Store first 16 items as maximum
      const maxData = data.slice(0, 16);
      setAllData(maxData);
      
      // Initially show first 8 items
      setExploreData(maxData.slice(0, 8));
    } catch (error) {
      console.error("Failed to fetch explore data:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const loadMoreItems = () => {
    if (displayedItems >= 16 || displayedItems >= allData.length) {
      return; // Don't load more if we've reached the limit
    }

    setLoadingMore(true);
    
    setTimeout(() => {
      const newDisplayCount = Math.min(displayedItems + 4, 16, allData.length);
      setDisplayedItems(newDisplayCount);
      setExploreData(allData.slice(0, newDisplayCount));
      setLoadingMore(false);
    }, 500);
  };

  const canLoadMore = displayedItems < 16 && displayedItems < allData.length;

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
            
            {/* Load More Button */}
            {canLoadMore && (
              <div className="col-lg-12">
                <div className="spacer-single"></div>
                <span 
                  onClick={loadMoreItems}
                  className="btn-main lead"
                  style={{ 
                    cursor: loadingMore ? 'not-allowed' : 'pointer',
                    opacity: loadingMore ? 0.6 : 1
                  }}
                >
                  {loadingMore ? 'Loading...' : 'Load more'}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;
