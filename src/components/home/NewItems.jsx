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
        setItems(data);
      } catch {
        setItems([
          { id: 1, nftImage, authorImage: AuthorImage, title: "Pinky Ocean", price: "5.07 ETH", likes: 69, expiryDate: new Date(Date.now() + 4000000).toISOString() },
          { id: 2, nftImage, authorImage: AuthorImage, title: "Deep Sea Phantasy", price: "0.17 ETH", likes: 99, expiryDate: new Date(Date.now() + 9000000).toISOString() },
          { id: 3, nftImage, authorImage: AuthorImage, title: "Rainbow Style", price: "0.18 ETH", likes: 17, expiryDate: new Date(Date.now() + 2900000).toISOString() },
          { id: 4, nftImage, authorImage: AuthorImage, title: "Two Tigers", price: "0.77 ETH", likes: 16, expiryDate: new Date(Date.now() - 1000).toISOString() }
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

  // Responsive helpers
  function getCardStyle() {
    if (window.innerWidth <= 580) return { border: "1px solid #e0e0e0", borderRadius: 12, width: "97vw", minWidth: 0, margin: "0 auto 18px", background: "#fff" };
    if (window.innerWidth <= 768) return { border: "1px solid #e0e0e0", borderRadius: 14, width: "88vw", maxWidth: 320, minWidth: 0, margin: "0 auto 18px", background: "#fff" };
    return { border: "1px solid #e0e0e0", borderRadius: 16, width: 320, margin: "0 auto", minWidth: 0, background: "#fff" }
  }
  function getImageStyle() {
    if (window.innerWidth <= 580) return { width: "100%", height: 110, objectFit: "cover" };
    if (window.innerWidth <= 768) return { width: "100%", height: 135, objectFit: "cover" };
    return { width: "100%", height: 200, objectFit: "cover" }
  }
  function getAuthorImgStyle() {
    let size = window.innerWidth <= 580 ? 30 : window.innerWidth <= 768 ? 36 : 45;
    return { width: size, height: size, borderRadius: "50%", border: "2px solid #fff", boxShadow: "0 2px 5px rgba(0,0,0,0.13)", background: "#fff" }
  }
  function getHeaderStyle() {
    const padding = window.innerWidth <= 580 ? "6px 10px 4px" : "12px 18px 8px";
    return { display: "flex", alignItems: "center", justifyContent: "space-between", padding, background: "#fff" }
  }
  function getArrowStyle(side="left") {
    let size = window.innerWidth <= 580 ? 29 : 38;
    let pos = side === "left" ? { left: 2 } : { right: 2 };
    return { width: size, height: size, background: "#fff", border: "1px solid #eee", borderRadius: "50%", color: "#444", position: "absolute", top: "50%", transform: "translateY(-50%)", zIndex: 9, fontSize: size*0.65, boxShadow: "0 2px 7px rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", ...pos }
  }

  const checkIconStyle = {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    background: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    width: "13px",
    height: "13px",
    fontSize: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff",
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
                <div style={getCardStyle()}>
                  <div style={getHeaderStyle()}>
                    <div style={{ position: "relative" }}>
                      <Link to="/author">
                        <img src={item.authorImage} alt="Author" style={getAuthorImgStyle()} />
                        <i className="fa fa-check" style={checkIconStyle}></i>
                      </Link>
                    </div>
                    <div style={{
                      padding: "5px 12px",
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: 18,
                      fontSize: "12px",
                      minWidth: 60,
                      textAlign: "center",
                      color: "#222",
                      fontWeight: 600,
                    }}>
                      {calculateCountdown(item.expiryDate)}
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img src={item.nftImage} alt={item.title} style={getImageStyle()} />
                  </Link>
                  <div style={{ padding: "16px" }}>
                    <Link to="/item-details">
                      <h4 style={{ fontWeight: 700, fontSize: "1.08rem", marginBottom: 7, color: "#212529" }}>{item.title}</h4>
                    </Link>
                    <div style={{ fontSize: "1rem", color: "#007bff", fontWeight: 600, marginBottom: 6 }}>{item.price}</div>
                    <div style={{ fontSize: "0.89rem", color: "#6c757d", display: "flex", alignItems: "center", gap: 5 }}>
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










