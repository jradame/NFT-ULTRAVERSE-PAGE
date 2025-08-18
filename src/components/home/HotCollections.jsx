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
        console.error("Error fetching collections:", error);
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

  const cardStyle = {
    border: "none",
    padding: 0,
    maxWidth: "280px",
    margin: "0 auto",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(52, 111, 255, 0.12)",
    transition: "all 0.3s ease",
    backgroundColor: "#fff",
    overflow: "visible",
  };

  const imageStyle = {
    borderRadius: "16px 16px 0 0",
    height: "180px",
    width: "100%",
    objectFit: "cover",
  };

  const profileStyle = {
    position: "absolute",
    bottom: "-45px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  };

  const profileImageStyle = {
    width: "65px",
    height: "65px",
    borderRadius: "50%",
    border: "4px solid #fff",
    backgroundColor: "#fff",
    boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
    display: "block",
  };

  const checkIconStyle = {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    background: "#007bff",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    fontSize: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff",
  };

  const infoStyle = {
    padding: "55px 20px 25px 20px",
    textAlign: "center",
  };

  const titleStyle = {
    fontWeight: "700",
    fontSize: "1.2rem",
    marginBottom: "8px",
    color: "#212529",
  };

  const tagStyle = {
    fontSize: "0.95rem",
    color: "#6c757d",
    fontWeight: "500",
  };

  const arrowStyle = {
    width: "45px",
    height: "45px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
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
                <div style={cardStyle}>
                  <div style={{ position: "relative" }}>
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        alt={collection.title || `NFT ${index + 1}`}
                        className="lazy img-fluid"
                        style={imageStyle}
                      />
                    </Link>
                    <div style={profileStyle}>
                      <Link to="/author">
                        <img
                          src={collection.authorImage}
                          alt="Author"
                          className="lazy pp-coll"
                          style={profileImageStyle}
                        />
                      </Link>
                      <i className="fa fa-check" style={checkIconStyle}></i>
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

          {loaded && instanceRef.current && collections.length > 0 && (
            <>
              <div
                style={{
                  ...arrowStyle,
                  left: "-30px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                  e.target.style.color = "#333";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                  e.target.style.color = "#666";
                }}
              >
                ‹
              </div>

              <div
                style={{
                  ...arrowStyle,
                  right: "-30px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                  e.target.style.color = "#333";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
                  e.target.style.color = "#666";
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

export default HotCollections;
















