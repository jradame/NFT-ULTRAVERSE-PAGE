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
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 900px)": { slides: { perView: 2, spacing: 15 } },
      "(max-width: 600px)": { slides: { perView: 1, spacing: 10 } },
    },
    created() {
      setLoaded(true);
    },
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
        setItems(data);
      } catch (error) {
        setItems([
          { id: 1, nftId: 10147817, nftImage, authorImage: AuthorImage, title: "Pinky Ocean", price: "5.07", likes: 69, authorId: 83937449, expiryDate: new Date(Date.now() + 4000000).toISOString() },
          { id: 2, nftId: 92975188, nftImage, authorImage: AuthorImage, title: "Deep Sea Phantasy", price: "0.17", likes: 99, authorId: 55757699, expiryDate: new Date(Date.now() + 9000000).toISOString() },
          { id: 3, nftId: 34521163, nftImage, authorImage: AuthorImage, title: "Rainbow Style", price: "0.18", likes: 17, authorId: 31906377, expiryDate: new Date(Date.now() + 2900000).toISOString() },
          { id: 4, nftId: 85809749, nftImage, authorImage: AuthorImage, title: "Two Tigers", price: "0.77", likes: 16, authorId: 73855012, expiryDate: new Date(Date.now() - 1000).toISOString() },
          { id: 5, nftId: 85809750, nftImage, authorImage: AuthorImage, title: "Galaxy Dreams", price: "1.23", likes: 45, authorId: 73855013, expiryDate: new Date(Date.now() + 7000000).toISOString() },
          { id: 6, nftId: 85809751, nftImage, authorImage: AuthorImage, title: "Ocean Waves", price: "0.89", likes: 33, authorId: 73855014, expiryDate: new Date(Date.now() + 5000000).toISOString() }
        ]);
      }
    }
    fetchNewItems();
  }, []);

  // FIX: Force slider update when items load
  useEffect(() => {
    if (items.length && instanceRef.current) {
      setTimeout(() => {
        instanceRef.current.update();
      }, 100);
    }
  }, [items]);

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

  return (
    <section id="section-items" className="no-bottom" style={{ paddingBottom: "80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        
        <div style={{ position: "relative", margin: "40px 0", padding: "0 30px" }}>
          {/* Force remount with key when items change */}
          <div key={items.length} ref={sliderRef} className="keen-slider">
            {items.map((item) => (
              <div className="keen-slider__slide" key={item.id}>
                <div
                  style={{
                    border: "1px solid #e0e0e0",
                    borderRadius: 16,
                    backgroundColor: "#fff",
                    padding: 0,
                    overflow: "hidden",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const img = e.currentTarget.querySelector('img.nft-image');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    const img = e.currentTarget.querySelector('img.nft-image');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  {/* WHITE HEADER with profile and timer */}
                  <div style={{
                    padding: "12px 16px 8px 16px",
                    backgroundColor: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <div style={{ position: "relative" }}>
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          src={item.authorImage}
                          alt="Author"
                          style={{
                            width: 45,
                            height: 45,
                            borderRadius: "50%",
                            border: "3px solid #fff",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }}
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
                            width: 14,
                            height: 14,
                            fontSize: 7,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #fff",
                          }}
                        />
                      </Link>
                    </div>
                    
                    <div style={{
                      padding: "5px 10px",
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid #d0d0d0",
                      borderRadius: 14,
                      fontSize: "10px",
                      fontWeight: 600,
                      color: "#333",
                      minWidth: 50,
                      textAlign: "center"
                    }}>
                      {calculateCountdown(item.expiryDate)}
                    </div>
                  </div>

                  {/* NFT IMAGE */}
                  <Link to={`/item-details/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      alt={item.title}
                      className="nft-image"
                      style={{
                        width: "100%",
                        height: 160,
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </Link>
                  
                  {/* CONTENT */}
                  <div style={{ padding: "14px 16px 16px 16px", textAlign: "left", flexGrow: 1 }}>
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        marginBottom: 6,
                        color: "#212529",
                        lineHeight: 1.2,
                      }}>
                        {item.title}
                      </h4>
                    </Link>
                    <div style={{
                      fontSize: "0.95rem",
                      color: "#007bff",
                      fontWeight: 600,
                      marginBottom: 6
                    }}>
                      {item.price} ETH
                    </div>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "#6c757d",
                      display: "flex",
                      alignItems: "center",
                      gap: 5
                    }}>
                      <i className="fa fa-heart" style={{ fontSize: "12px", color: "#ccc" }}></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: "-25px",
                  width: 45,
                  height: 45,
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#444",
                  zIndex: 15,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
                }}
                onClick={() => instanceRef.current?.prev()}
              >
                &#8249;
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "-25px",
                  width: 45,
                  height: 45,
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  color: "#444",
                  zIndex: 15,
                  boxShadow: "0 3px 15px rgba(0,0,0,0.1)",
                }}
                onClick={() => instanceRef.current?.next()}
              >
                &#8250;
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;









