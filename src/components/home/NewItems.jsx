import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "../../css/styles/style.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});
  const [itemExpiries, setItemExpiries] = useState({});

  // Sample names for variety
  const sampleOwners = [
    "Alex Thompson", "Sarah Mitchell", "Marcus Rodriguez", "Emily Chen",
    "David Williams", "Jessica Park", "Ryan Foster", "Maya Singh"
  ];

  const sampleCreators = [
    "Artist Kyle", "Maya Digital", "Crypto Sam", "Luna Arts",
    "Neo Creator", "Pixel Master", "Dream Coder", "Void Artist"
  ];

  // Different profile images for owners (current holders)
  const ownerProfileImages = [
    "https://i.pravatar.cc/150?img=13", "https://i.pravatar.cc/150?img=14",
    "https://i.pravatar.cc/150?img=15", "https://i.pravatar.cc/150?img=16",
    "https://i.pravatar.cc/150?img=17", "https://i.pravatar.cc/150?img=18",
    "https://i.pravatar.cc/150?img=25", "https://i.pravatar.cc/150?img=26"
  ];

  // ✅ SEPARATE profile images for creators (different from owners)
  const creatorProfileImages = [
    "https://i.pravatar.cc/150?img=19", "https://i.pravatar.cc/150?img=20",
    "https://i.pravatar.cc/150?img=21", "https://i.pravatar.cc/150?img=22",
    "https://i.pravatar.cc/150?img=23", "https://i.pravatar.cc/150?img=24",
    "https://i.pravatar.cc/150?img=27", "https://i.pravatar.cc/150?img=28"
  ];

  // Keen Slider Setup - EXACTLY like HotCollections
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
    if (items.length > 0 && Object.keys(itemExpiries).length === 0) {
      const expiries = {};
      items.forEach((item, index) => {
        const now = new Date();
        const hoursToAdd = Math.floor(Math.random() * 24) + 1;
        expiries[item.id] = new Date(now.getTime() + (hoursToAdd * 60 * 60 * 1000)).getTime();
      });
      setItemExpiries(expiries);
    }
  }, [items]);

  useEffect(() => {
    if (Object.keys(itemExpiries).length === 0) return;
    const interval = setInterval(() => {
      const newCountdowns = {};
      Object.keys(itemExpiries).forEach(itemId => {
        const now = new Date().getTime();
        const expiry = itemExpiries[itemId];
        const timeDiff = expiry - now;
        
        if (timeDiff <= 0) {
          // Reset timer when it reaches zero
          const hoursToAdd = Math.floor(Math.random() * 24) + 1;
          const newExpiry = new Date(now + (hoursToAdd * 60 * 60 * 1000)).getTime();
          setItemExpiries(prev => ({...prev, [itemId]: newExpiry}));
          
          const newTimeDiff = newExpiry - now;
          const hours = Math.floor(newTimeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((newTimeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((newTimeDiff % (1000 * 60)) / 1000);
          newCountdowns[itemId] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          const hours = Math.floor(timeDiff / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          newCountdowns[itemId] = `${hours}h ${minutes}m ${seconds}s`;
        }
      });
      setCountdowns(newCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [itemExpiries]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to load items", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container position-relative">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              <div ref={sliderRef} className="keen-slider">
                {items.slice(0, 8).map((item, index) => {
                  const stateData = {
                    collection: {
                      ...item,
                      // Owner data (current holder)
                      authorName: sampleOwners[index % sampleOwners.length],
                      authorImage: ownerProfileImages[index % ownerProfileImages.length],
                      // ✅ Creator data (original artist) - DIFFERENT from owner
                      creatorName: sampleCreators[index % sampleCreators.length],
                      creatorImage: creatorProfileImages[index % creatorProfileImages.length],
                      views: Math.floor(Math.random() * 1500) + 200,
                      likes: item.likes || Math.floor(Math.random() * 100) + 10,
                      price: item.price || (Math.random() * 3 + 0.1).toFixed(2),
                    },
                  };

                  return (
                    <div className="keen-slider__slide" key={item.id}>
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to={`/item-details/${item.nftId}`} state={stateData}>
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt={item.title}
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp position-relative">
                          <Link to={`/item-details/${item.nftId}`} state={stateData}>
                            <img
                              className="lazy pp-coll"
                              src={ownerProfileImages[index % ownerProfileImages.length]}
                              alt={sampleOwners[index % sampleOwners.length]}
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                              }}
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
                        
                        {/* ✅ COUNTDOWN TIMER with better styling */}
                        <div className="de_countdown" style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(0,0,0,0.8)",
                          color: "white",
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          zIndex: "10",
                          backdropFilter: "blur(5px)",
                          border: "1px solid rgba(255,255,255,0.1)"
                        }}>
                          {countdowns[item.id] || "Loading..."}
                        </div>
                        
                        <div className="nft_coll_info">
                          <Link to={`/item-details/${item.nftId}`} state={stateData}>
                            <h4>{item.title}</h4>
                          </Link>
                          <span>{parseFloat(item.price || 0).toFixed(2)} ETH</span>
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
                aria-label="Next Items"
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

export default NewItems;








