import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Keen Slider: Responsive settings
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 30,
    },
    breakpoints: {
      "(max-width: 1200px)": {
        slides: { perView: 3, spacing: 24 },
      },
      "(max-width: 900px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 600px)": {
        slides: { perView: 1, spacing: 8 },
      },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );
        const data = await response.json();
        setCollections(data);
      } catch (error) {
        setCollections([
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Abstraction",
            tag: "ERC-192",
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Patternlicious",
            tag: "ERC-661",
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Sketchify",
            tag: "ERC-164",
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Cartoonism",
            tag: "ERC-112",
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Virtualand",
            tag: "ERC-721",
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Papercut",
            tag: "ERC-1155",
          },
        ]);
      }
    }
    fetchCollections();
  }, []);

  // Styles that adapt to screen size using percentages and media queries
  const cardBase = {
    border: "none",
    padding: 0,
    borderRadius: 16,
    backgroundColor: "#fff",
    boxShadow: "0 8px 25px rgba(52, 111, 255, 0.12)",
    transition: "all 0.3s ease",
    overflow: "visible",
    maxWidth: 320,
    margin: "0 auto",
    width: "100%",
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const imageBase = {
    borderRadius: "16px 16px 0 0",
    width: "100%",
    objectFit: "cover",
    height: 180,
    display: "block",
  };

  // Media query helpers for responsive sizes
  function getResponsiveCardStyle() {
    if (window.innerWidth <= 600) return { ...cardBase, maxWidth: "98vw" };
    if (window.innerWidth <= 900) return { ...cardBase, maxWidth: 300 };
    if (window.innerWidth <= 1200) return { ...cardBase, maxWidth: 260 };
    return cardBase;
  }
  function getResponsiveImageStyle() {
    if (window.innerWidth <= 600) return { ...imageBase, height: 135 };
    if (window.innerWidth <= 900) return { ...imageBase, height: 150 };
    if (window.innerWidth <= 1200) return { ...imageBase, height: 170 };
    return imageBase;
  }
  function getProfileImageStyle() {
    let size = 65;
    if (window.innerWidth <= 600) size = 46;
    else if (window.innerWidth <= 900) size = 54;
    else if (window.innerWidth <= 1200) size = 62;
    return {
      width: size,
      height: size,
      borderRadius: "50%",
      border: "4px solid #fff",
      backgroundColor: "#fff",
      boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
      display: "block",
    };
  }
  function getProfileStyle() {
    let bottom = -45;
    if (window.innerWidth <= 600) bottom = -32;
    else if (window.innerWidth <= 900) bottom = -38;
    else if (window.innerWidth <= 1200) bottom = -43;
    return {
      position: "absolute",
      bottom: bottom,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
    };
  }
  function getArrowStyle(position) {
    let side = position === "left" ? { left: "-18px" } : { right: "-18px" };
    let size = 40;
    if (window.innerWidth <= 900) {
      side = position === "left" ? { left: "-7px" } : { right: "-7px" };
      size = 34;
    }
    return {
      width: size,
      height: size,
      backgroundColor: "rgba(255,255,255,1)",
      border: "1px solid rgba(0,0,0,0.08)",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#444",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 15,
      fontSize: size * 0.7,
      boxShadow: "0 3px 12px rgba(30,30,30,0.08)",
      ...side,
    };
  }

  // Listen for window resize to re-render with correct styles
  const [, setScreen] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const infoStyle = {
    padding: "55px 18px 22px 18px",
    textAlign: "center",
  };
  const titleStyle = {
    fontWeight: 700,
    fontSize: "1.12rem",
    marginBottom: 8,
    color: "#212529",
    wordBreak: "break-word",
  };
  const tagStyle = {
    fontSize: "0.95rem",
    color: "#6c757d",
    fontWeight: 500,
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", margin: "40px 0" }}>
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection, index) => (
              <div key={index} className="keen-slider__slide">
                <div style={getResponsiveCardStyle()}>
                  <div style={{ position: "relative" }}>
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        alt={collection.title || `NFT ${index + 1}`}
                        className="lazy img-fluid"
                        style={getResponsiveImageStyle()}
                      />
                    </Link>
                    <div style={getProfileStyle()}>
                      <Link to="/author">
                        <img
                          src={collection.authorImage}
                          alt="Author"
                          className="lazy pp-coll"
                          style={getProfileImageStyle()}
                        />
                      </Link>
                      <i
                        className="fa fa-check"
                        style={{
                          position: "absolute",
                          bottom: 2,
                          right: 2,
                          background: "#007bff",
                          color: "#fff",
                          borderRadius: "50%",
                          width: 20,
                          height: 20,
                          fontSize: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "2px solid #fff",
                        }}
                      ></i>
                    </div>
                  </div>
                  <div style={infoStyle}>
                    <Link to="/explore">
                      <h4 style={titleStyle}>{collection.title}</h4>
                    </Link>
                    <span style={tagStyle}>{collection.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Circular, always visible neutral arrows */}
          {loaded && instanceRef.current && collections.length > 0 && (
            <>
              <div
                style={getArrowStyle("left")}
                onClick={e => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
              >
                &#8249;
              </div>
              <div
                style={getArrowStyle("right")}
                onClick={e => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
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

export default HotCollections;


















