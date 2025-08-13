import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const ITEM_ROUTE_BASE = "/item";   // change if your item route differs
const AUTHOR_ROUTE_BASE = "/author";

const NewItems = () => {
  const navigate = useNavigate();
  const [newItemsData, setNewItemsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchNewItemsData();
  }, []);

  const fetchNewItemsData = async () => {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
      const data = await response.json();
      setNewItemsData((Array.isArray(data) ? data : []).slice(0, 12)); // 12 items for slider
    } catch (error) {
      console.error("Failed to fetch new items data:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  // Safe getters for potential API key variations
  const getItemId = (item) =>
    item?.id ?? item?.nftId ?? item?.tokenId ?? item?.token_id ?? null;

  const getAuthorId = (item) =>
    item?.authorId ?? item?.author_id ?? item?.creatorId ?? item?.creator_id ?? null;

  // Keen Slider setup
  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 15 },
      },
    },
    dragStarted: () => setIsDragging(true),
    dragEnded: () => {
      // small delay so click doesn’t fire right after drag
      setTimeout(() => setIsDragging(false), 0);
    },
  });

  // Countdown Timer (white background)
  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(expiryDate).getTime() - now;

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          const pad = (n) => n.toString().padStart(2, "0");
          setTimeLeft(`${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`);
        } else {
          setTimeLeft("Expired");
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [expiryDate]);

    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        color: '#333',
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        backdropFilter: 'blur(10px)'
      }}>
        {timeLeft}
      </div>
    );
  };

  const handleCardClick = (item) => {
    if (isDragging) return; // don't navigate while dragging
    const itemId = getItemId(item);
    if (!itemId) return;
    navigate(`${ITEM_ROUTE_BASE}/${itemId}`, { state: { item, from: "newItems" } });
  };

  if (loading) {
    return (
      <section id="section-items" className="no-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>New Items</h2>
                <div className="small-border bg-color-2"></div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', padding: '20px 0' }}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} style={{ width: '280px' }}>
                <div style={{ 
                  backgroundColor: 'white',
                  borderRadius: '16px', 
                  overflow: 'hidden', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  border: '1px solid #f1f1f1'
                }}>
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e0e0' }}></div>
                      <div style={{ background: '#e0e0e0', padding: '6px 12px', borderRadius: '12px', fontSize: '11px' }}>Loading...</div>
                    </div>
                    <div style={{ height: '280px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', borderRadius: '12px' }}>Loading...</div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Loading...</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '16px', color: '#8b5cf6', fontWeight: '700' }}>--- ETH</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>❤️ ---</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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

          {/* Keen Slider */}
          <div ref={sliderRef} className="keen-slider">
            {newItemsData.map((item, index) => {
              const itemId = getItemId(item);
              const authorId = getAuthorId(item);

              const randomDays = Math.floor(Math.random() * 7) + 1;
              const expiryDate = new Date();
              expiryDate.setDate(expiryDate.getDate() + randomDays);

              const randomLikes = Math.floor(Math.random() * 50) + 1;

              return (
                <div key={itemId ?? index} className="keen-slider__slide">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => handleCardClick(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleCardClick(item);
                    }}
                    style={{ 
                      backgroundColor: 'white',
                      borderRadius: '16px', 
                      overflow: 'hidden', 
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      cursor: itemId ? 'pointer' : 'default',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #f1f1f1',
                      margin: '0 10px',
                      height: 'auto'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                  >
                    {/* TOP: Avatar + Timer */}
                    <div style={{ padding: '16px' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}>
                        {/* Avatar → link to author; stop propagation so card click won't fire */}
                        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
                          {authorId ? (
                            <Link
                              to={`${AUTHOR_ROUTE_BASE}/${authorId}`}
                              state={{ item, from: "newItems" }}
                              style={{ display: "inline-block" }}
                              aria-label="View author"
                            >
                              <img 
                                src={item.authorImage || `https://i.pravatar.cc/48?img=${index + 1}`}
                                alt="Creator"
                                loading="lazy"
                                style={{ 
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  border: '3px solid #fff',
                                  boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                                }}
                              />
                            </Link>
                          ) : (
                            <img 
                              src={item.authorImage || `https://i.pravatar.cc/48?img=${index + 1}`}
                              alt="Creator"
                              loading="lazy"
                              style={{ 
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '3px solid #fff',
                                boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                              }}
                            />
                          )}
                        </div>

                        {/* Timer */}
                        <CountdownTimer expiryDate={expiryDate} />
                      </div>
                      
                      {/* NFT Image */}
                      <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
                        <img 
                          src={item.nftImage} 
                          alt={item.title} 
                          loading="lazy"
                          style={{ 
                            width: '100%', 
                            height: '280px',
                            objectFit: 'cover',
                            borderRadius: '12px',
                            display: 'block'
                          }}
                        />
                      </div>
                    </div>

                    {/* BOTTOM: title, price, likes */}
                    <div style={{ padding: '16px' }}>
                      <div style={{ 
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#1a1a1a',
                        marginBottom: '8px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.title}
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ 
                          fontSize: '16px', 
                          color: '#8b5cf6', 
                          fontWeight: '700'
                        }}>
                          {item.price} ETH
                        </div>
                        
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '4px', fontSize: '14px' }}>❤️</span>
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                            {item.likes ?? randomLikes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Arrows */}
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

          <button
            className="slider-arrow prev-arrow"
            onClick={() => slider.current?.prev()}
            aria-label="Previous Slide"
            style={{ left: '10px' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 19L9 12L16 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewItems;





