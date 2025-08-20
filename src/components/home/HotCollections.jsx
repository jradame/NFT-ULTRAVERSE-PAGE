import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 900px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(max-width: 600px)": {
        slides: { perView: 1, spacing: 10 },
      },
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
            id: 1,
            nftId: 39924405,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Abstraction",
            code: 192,
            authorId: 83937449,
          },
          {
            id: 2,
            nftId: 85809749,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Patternlicious",
            code: 661,
            authorId: 73855012,
          },
          {
            id: 3,
            nftId: 92982521,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Sketchify",
            code: 164,
            authorId: 49986179,
          },
          {
            id: 4,
            nftId: 33908428,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Cartoonism",
            code: 316,
            authorId: 87818782,
          },
          {
            id: 5,
            nftId: 33908429,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Digital Dreams",
            code: 721,
            authorId: 87818783,
          },
          {
            id: 6,
            nftId: 33908430,
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Abstract Waves",
            code: 1155,
            authorId: 87818784,
          },
        ]);
      }
    }
    fetchCollections();
  }, []);

  // FIX: Force slider update when collections load
  useEffect(() => {
    if (collections.length && instanceRef.current) {
      setTimeout(() => {
        instanceRef.current.update();
      }, 100);
    }
  }, [collections]);

  return (
    <section id="section-collections" className="no-bottom" style={{ paddingBottom: "80px" }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", margin: "40px 0", padding: "0 30px" }}>
          {/* Force remount with key when collections change */}
          <div key={collections.length} ref={sliderRef} className="keen-slider">
            {collections.map((collection) => (
              <div key={collection.id} className="keen-slider__slide">
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
                  <div style={{ position: "relative" }}>
                    <Link to={`/item-details/${collection.nftId}`}>
                      <img
                        src={collection.nftImage}
                        alt={collection.title}
                        className="nft-image"
                        style={{
                          borderRadius: "16px 16px 0 0",
                          width: "100%",
                          height: 160,
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Link>
                    <div style={{
                      position: "absolute",
                      bottom: -25,
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 10,
                    }}>
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          src={collection.authorImage}
                          alt="Author"
                          style={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            border: "3px solid #fff",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
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
                            width: 16,
                            height: 16,
                            fontSize: 8,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px solid #fff",
                          }}
                        />
                      </Link>
                    </div>
                  </div>
                  <div style={{
                    padding: "35px 12px 16px 12px",
                    textAlign: "center",
                    flexGrow: 1,
                  }}>
                    <Link to={`/author/${collection.authorId}`}>
                      <h4 style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        marginBottom: 6,
                        color: "#212529",
                        lineHeight: 1.2,
                      }}>
                        {collection.title}
                      </h4>
                    </Link>
                    <span style={{
                      fontSize: "0.85rem",
                      color: "#6c757d",
                      fontWeight: 500,
                    }}>
                      ERC-{collection.code}
                    </span>
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

export default HotCollections;

