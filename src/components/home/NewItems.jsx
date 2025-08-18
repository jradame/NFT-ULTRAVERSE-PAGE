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

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 3, spacing: 25 },
      },
      "(max-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(max-width: 480px)": {
        slides: { perView: 1, spacing: 15 },
      },
    },
    created() {
      setLoaded(true);
    },
  });

  // Update countdown every second and reset expired timers
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // Reset expired timers by adding random time between 1-24 hours
      setItems(prevItems =>
        prevItems.map(item => {
          const now = new Date().getTime();
          const expiry = new Date(item.expiryDate).getTime();
          if (expiry <= now) {
            const randomHours = Math.floor(Math.random() * 24) + 1;
            return {
              ...item,
              expiryDate: new Date(now + randomHours * 60 * 60 * 1000).toISOString()
            };
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
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching new items:", error);
        setItems([
          {
            id: 1,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Pinky Ocean",
            price: "5.07 ETH",
            likes: 69,
            expiryDate: new Date(Date.now() + 2*60*60*1000 + 56*60*1000 + 39*1000).toISOString()
          },
          {
            id: 2,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Deep Sea Phantasy",
            price: "0.17 ETH",
            likes: 99,
            expiryDate: new Date(Date.now() + 4*60*60*1000 + 15*60*1000 + 22*1000).toISOString()
          },
          {
            id: 3,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Rainbow Style",
            price: "0.18 ETH",
            likes: 17,
            expiryDate: new Date(Date.now() + 1*60*60*1000 + 45*60*1000 + 10*1000).toISOString()
          },
          {
            id: 4,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Two Tigers",
            price: "0.77 ETH",
            likes: 16,
            expiryDate: new Date(Date.now() - 10*60*1000).toISOString()
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

  const cardStyle = {
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(52, 111, 255, 0.12)",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
    overflow: "hidden",
    maxWidth: "320px",
    margin: "0 auto"
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "15px 20px",
    backgroundColor: "#fff"
  };

  const authorStyle = {
    position: "relative"
  };

  const authorImageStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "3px solid #fff",
    backgroundColor: "#fff",
    boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
  };

  const checkIconStyle = {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    background: "#007bff",
    color: "white",
    borderRadius: "50%",
    width: "16px",
    height: "16px",
    fontSize: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff"
  };

  const countdownStyle = {
    padding: "6px 12px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#333"
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover"
  };

  const infoStyle = {
    padding: "20px"
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#212529"
  };

  const priceStyle = {
    fontSize: "1rem",
    color: "#007bff",
    fontWeight: "600",
    marginBottom: "8px"
  };

  const likesStyle = {
    fontSize: "0.9rem",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  };

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

        <div style={{ position: "relative", margin: "40px 0" }}>
          <div ref={sliderRef} className="keen-slider">
            {items.map((item) => (
              <div className="keen-slider__slide" key={item.id}>
                <div style={cardStyle}>
                  {/* Author and Countdown in white space above image */}
                  <div style={headerStyle}>
                    <div style={authorStyle}>
                      <Link to="/author">
                        <img
                          src={item.authorImage}
                          alt="Author"
                          style={authorImageStyle}
                        />
                        <i className="fa fa-check" style={checkIconStyle}></i>
                      </Link>
                    </div>
                    <div style={countdownStyle}>
                      {calculateCountdown(item.expiryDate)}
                    </div>
                  </div>

                  {/* NFT Image */}
                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      style={imageStyle}
                    />
                  </Link>

                  {/* Item Info */}
                  <div style={infoStyle}>
                    <Link to="/item-details">
                      <h4 style={titleStyle}>{item.title}</h4>
                    </Link>
                    <div style={priceStyle}>{item.price}</div>
                    <div style={likesStyle}>
                      <i className="fa fa-heart"></i>
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
                style={{
                  position: "absolute",
                  left: "-30px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#212529"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
              >
                ‹
              </div>

              <div
                style={{
                  position: "absolute",
                  right: "-30px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "45px",
                  height: "45px",
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  fontSize: "18px",
                  fontWeight: "bold",
                  color: "#212529"
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
              >
                ›
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;





