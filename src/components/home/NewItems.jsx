import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 30 },
    breakpoints: {
      "(max-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
      "(max-width: 768px)": { slides: { perView: 2, spacing: 10 } },
      "(max-width: 580px)": { slides: { perView: 1, spacing: 5 } },
    },
    created() { setLoaded(true); },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setItems(prev =>
        prev.map(item => {
          const now = Date.now();
          const expiry = new Date(item.expiryDate).getTime();
          if (expiry <= now) {
            const randomHours = Math.floor(Math.random() * 24) + 1;
            return { ...item, expiryDate: new Date(now + randomHours * 3600000).toISOString() };
          }
          return item;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        const data = await response.json();
        console.log("NewItems API Data:", data);
        setItems(data);
      } catch (error) {
        console.error("NewItems API Error:", error);
        setItems([
          { 
            id: 1, nftId: 10147817, nftImage, authorImage: AuthorImage, 
            title: "Pinky Ocean", price: "5.07", likes: 69, authorId: 83937449,
            expiryDate: new Date(Date.now() + 4000000).toISOString() 
          },
          { 
            id: 2, nftId: 92975188, nftImage, authorImage: AuthorImage, 
            title: "Deep Sea Phantasy", price: "0.17", likes: 99, authorId: 55757699,
            expiryDate: new Date(Date.now() + 9000000).toISOString() 
          },
          { 
            id: 3, nftId: 34521163, nftImage, authorImage: AuthorImage, 
            title: "Rainbow Style", price: "0.18", likes: 17, authorId: 31906377,
            expiryDate: new Date(Date.now() + 2900000).toISOString() 
          },
          { 
            id: 4, nftId: 85809749, nftImage, authorImage: AuthorImage, 
            title: "Two Tigers", price: "0.77", likes: 16, authorId: 73855012,
            expiryDate: new Date(Date.now() - 1000).toISOString() 
          }
        ]);
      }
    }
    fetchNewItems();
  }, []);

  const calculateCountdown = (expiryDate) => {
    const now = currentTime.getTime();
    const expiry = new Date(expiryDate).getTime();
    const difference = expiry - now;
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return `${hours}h ${minutes}m ${seconds}s`;
    } else {
      return "EXPIRED";
    }
  };

  // Card with white header area
  const cardBase = {
    border: "1px solid #e0e0e0",
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 0,
    transition: "all 0.3s ease",
    overflow: "hidden",
    maxWidth: 320,
    margin: "0 auto",
    width: "100%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
  };

  function getResponsiveCardStyle() {
    if (window.innerWidth <= 600) return { ...cardBase, maxWidth: "98vw" };
    if (window.innerWidth <= 900) return { ...cardBase, maxWidth: 300 };
    if (window.innerWidth <= 1200) return { ...cardBase, maxWidth: 260 };
    return cardBase;
  }

  // White header area with profile and timer
  const headerStyle = {
    padding: "12px 16px 8px 16px",
    backgroundColor: "#fff",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  // Profile image style
  function getProfileImageStyle() {
    let size = 50;
    if (window.innerWidth <= 600) size = 36;
    else if (window.innerWidth <= 900) size = 42;
    else if (window.innerWidth <= 1200) size = 46;
    return {
      width: size,
      height: size,
      borderRadius: "50%",
      border: "3px solid #fff",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      display: "block",
    };
  }

  // Timer style
  const timerStyle = {
    padding: "6px 12px",
    background: "rgba(255,255,255,0.95)",
    border: "1px solid #d0d0d0",
    borderRadius: 16,
    fontSize: "11px",
    fontWeight: 600,
    color: "#333",
    minWidth: 60,
    textAlign: "center"
  };

  // Image style
  const imageBase = {
    width: "100%",
    objectFit: "cover",
    height: 180,
    display: "block",
    transition: "transform 0.3s ease",
  };

  function getResponsiveImageStyle() {
    if (window.innerWidth <= 600) return { ...imageBase, height: 135 };
    if (window.innerWidth <= 900) return { ...imageBase, height: 150 };
    if (window.innerWidth <= 1200) return { ...imageBase, height: 170 };
    return imageBase;
  }

  function getArrowStyle(side="left") {
    let size = window.innerWidth <= 580 ? 29 : 38;
    let pos = side === "left" ? { left: 2 } : { right: 2 };
    return { 
      width: size, height: size, background: "#fff", border: "1px solid #e0e0e0", 
      borderRadius: "50%", color: "#444", position: "absolute", top: "50%", 
      transform: "translateY(-50%)", zIndex: 9, fontSize: size*0.65, 
      boxShadow: "0 2px 7px rgba(0,0,0,0.08)", display: "flex", 
      alignItems: "center", justifyContent: "center", cursor: "pointer", ...pos 
    }
  }

  const infoStyle = {
    padding: "16px 18px 18px 18px",
    textAlign: "left",
  };

  return (
    <section id="section-items" className="no-bottom" style={{ paddingBottom: "80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <div 
          style={{ position: "relative", margin: "40px 0" }}
          data-aos="fade-up" 
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <div ref={sliderRef} className="keen-slider">
            {items.map((item) => (
              <div className="keen-slider__slide" key={item.id}>
                <div 
                  style={getResponsiveCardStyle()}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img.nft-image');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img.nft-image');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* WHITE HEADER AREA with profile and timer */}
                  <div style={headerStyle}>
                    <div style={{ position: "relative" }}>
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          src={item.authorImage}
                          alt="Author"
                          className="lazy pp-coll"
                          style={getProfileImageStyle()}
                        />
                        <i
                          className="fa fa-check"
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            background: "#007bff",
                            color: "#fff",
                            borderRadius: "50%",
                            width: 16,
                            height: 16,
                            fontSize: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #fff",
                          }}
                        ></i>
                      </Link>
                    </div>
                    
                    <div style={timerStyle}>
                      {calculateCountdown(item.expiryDate)}
                    </div>
                  </div>

                  {/* NFT IMAGE */}
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      className="lazy img-fluid nft-image"
                      style={getResponsiveImageStyle()}
                    />
                  </Link>
                  
                  {/* CONTENT BELOW IMAGE */}
                  <div style={infoStyle}>
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4 style={{ 
                        fontWeight: 700, 
                        fontSize: "1.12rem", 
                        marginBottom: 8, 
                        color: "#212529" 
                      }}>
                        {item.title}
                      </h4>
                    </Link>
                    <div style={{ 
                      fontSize: "1rem", 
                      color: "#007bff", 
                      fontWeight: 600, 
                      marginBottom: 8 
                    }}>
                      {item.price} ETH
                    </div>
                    <div style={{ 
                      fontSize: "0.9rem", 
                      color: "#6c757d", 
                      display: "flex", 
                      alignItems: "center", 
                      gap: 6 
                    }}>
                      <i className="fa fa-heart" style={{ fontSize: "14px", color: "#ccc" }}></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {loaded && instanceRef.current && items.length > 0 && (
            <>
              <div
                style={getArrowStyle("left")}
                onClick={e => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
              >&#8249;</div>
              <div
                style={getArrowStyle("right")}
                onClick={e => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
              >&#8250;</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;








