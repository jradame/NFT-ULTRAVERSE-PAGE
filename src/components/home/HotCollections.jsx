// src/components/home/HotCollections.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/styles/style.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample names and prices to match your desired output
  const sampleOwners = [
    "Gayle Hicks",
    "Marcus Johnson", 
    "Sarah Chen",
    "David Wilson",
    "Emma Rodriguez",
    "Alex Turner"
  ];

  const sampleCreators = [
    "Jimmy Wright",
    "Lisa Park",
    "Ryan Mitchell",
    "Maya Patel",
    "Chris Anderson",
    "Jordan Lee"
  ];

  const samplePrices = ["0.29", "1.45", "0.87", "2.13", "0.64", "1.92"];

  // Sample views and likes arrays
  const sampleViews = [1250, 892, 2104, 756, 1876, 1432];
  const sampleLikes = [89, 156, 234, 67, 198, 123];

  // Random NFT IDs like #942, #3847, etc.
  const sampleNFTIds = [3, 942, 1537, 8291, 456, 7623];

  // Different profile images for owners and creators
  const ownerProfileImages = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=7",
    "https://i.pravatar.cc/150?img=9",
    "https://i.pravatar.cc/150?img=11"
  ];

  const creatorProfileImages = [
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=6",
    "https://i.pravatar.cc/150?img=8",
    "https://i.pravatar.cc/150?img=10",
    "https://i.pravatar.cc/150?img=12"
  ];

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1 },
      },
    },
  });

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await res.json();
        setCollections(data);
      } catch (err) {
        console.error("Failed to load collections", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div ref={sliderRef} className="keen-slider">
                {collections.slice(0, 6).map((collection, index) => {
                  const stateData = {
                    collection: {
                      ...collection,
                      // Override the id with random numbers
                      id: sampleNFTIds[index % sampleNFTIds.length],
                      // Use sample names and prices that rotate through the arrays
                      authorName: sampleOwners[index % sampleOwners.length],
                      creatorName: sampleCreators[index % sampleCreators.length],
                      authorImage: ownerProfileImages[index % ownerProfileImages.length],
                      creatorImage: creatorProfileImages[index % creatorProfileImages.length],
                      price: samplePrices[index % samplePrices.length],
                      // Use sample views and likes
                      views: sampleViews[index % sampleViews.length],
                      likes: sampleLikes[index % sampleLikes.length],
                    },
                  };

                  return (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${sampleNFTIds[index % sampleNFTIds.length]}`} state={stateData}>
                            <img
                              src={collection.nftImage}
                              className="lazy img-fluid"
                              alt={collection.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp position-relative">
                          <Link to={`/item-details/${sampleNFTIds[index % sampleNFTIds.length]}`} state={stateData}>
                            <img
                              className="lazy pp-coll"
                              src={ownerProfileImages[index % ownerProfileImages.length]}
                              alt={sampleOwners[index % sampleOwners.length]}
                            />
                          </Link>
                          <i 
                            className="fa fa-check position-absolute"
                            style={{
                              bottom: "0px",
                              right: "0px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              fontSize: "12px",
                              padding: "2px",
                              color: "#007bff"
                            }}
                          ></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to={`/item-details/${sampleNFTIds[index % sampleNFTIds.length]}`} state={stateData}>
                            <h4>{collection.title}</h4>
                          </Link>
                          <span>{collection.code}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Arrow */}
              <button
                className="slider-arrow next-arrow"
                onClick={() => slider.current?.next()}
                aria-label="Next Slide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 5L15 12L8 19"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;














