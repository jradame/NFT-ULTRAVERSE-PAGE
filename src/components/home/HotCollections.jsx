import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 4,
      spacing: 20,
    },
    breakpoints: {
      "(max-width: 480px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(max-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
      "(max-width: 1024px)": {
        slides: {
          perView: 3,
          spacing: 15,
        },
      },
    },
    loop: true,
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
        // Fallback to static data if API fails
        setCollections([
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Pinky Ocean",
            tag: "ERC-192"
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Blue Dreams",
            tag: "ERC-721"
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Cyber Punk",
            tag: "ERC-1155"
          },
          {
            nftImage: nftImage,
            authorImage: AuthorImage,
            title: "Digital Art",
            tag: "ERC-192"
          }
        ]);
      }
    }
    fetchCollections();
  }, []);

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

        <div className="navigation-wrapper">
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection, index) => (
              <div className="keen-slider__slide" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img 
                        src={collection.nftImage} 
                        className="lazy img-fluid" 
                        alt={collection.title || `NFT ${index + 1}`} 
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img 
                        className="lazy pp-coll" 
                        src={collection.authorImage} 
                        alt="Author" 
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{collection.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {loaded && instanceRef.current && collections.length > 0 && (
            <>
              <Arrow
                left
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
              />
              <Arrow
                onClick={(e) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

function Arrow({ disabled, left, onClick }) {
  const disabledClass = disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={onClick}
      className={`arrow ${left ? "arrow--left" : "arrow--right"}${disabledClass}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && (
        <path d="m13.293 6.293-6 6a1 1 0 0 0 0 1.414l6 6a1 1 0 1 0 1.414-1.414L9.414 13H20a1 1 0 1 0 0-2H9.414l5.293-5.293a1 1 0 0 0-1.414-1.414z" />
      )}
      {!left && (
        <path d="m20 13-1.586 0-5.293 5.293a1 1 0 1 0 1.414 1.414l6-6a1 1 0 0 0 0-1.414l-6-6a1 1 0 0 0-1.414 1.414L18.414 11H4a1 1 0 0 0 0 2z" />
      )}
    </svg>
  );
}

export default HotCollections;













