import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [, setScreen] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreen(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function fetchTopSellers() {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await response.json();
        console.log("TopSellers API Data:", data);
        setSellers(data);
      } catch (error) {
        console.error("TopSellers API Error:", error);
        setSellers([
          { id: 1, authorImage: AuthorImage, authorName: "Monica Lucas", price: "1.2", authorId: 83937449 },
          { id: 2, authorImage: AuthorImage, authorName: "Lori Hart", price: "7.2", authorId: 73855012 },
          { id: 3, authorImage: AuthorImage, authorName: "Gayle Hicks", price: "2.7", authorId: 55757699 },
          { id: 4, authorImage: AuthorImage, authorName: "Stacy Long", price: "1.3", authorId: 31906377 },
          { id: 5, authorImage: AuthorImage, authorName: "Mamie Barnett", price: "4.4", authorId: 18556210 },
          { id: 6, authorImage: AuthorImage, authorName: "Jimmy Wright", price: "2.8", authorId: 83937449 },
          { id: 7, authorImage: AuthorImage, authorName: "Claude Banks", price: "3.8", authorId: 73855012 },
          { id: 8, authorImage: AuthorImage, authorName: "Ida Chapman", price: "5.2", authorId: 55757699 },
          { id: 9, authorImage: AuthorImage, authorName: "Fred Ryan", price: "0.7", authorId: 31906377 },
          { id: 10, authorImage: AuthorImage, authorName: "Nicholas Daniels", price: "4.2", authorId: 18556210 },
          { id: 11, authorImage: AuthorImage, authorName: "Karla Sharp", price: "1.2", authorId: 83937449 },
          { id: 12, authorImage: AuthorImage, authorName: "Franklin Greer", price: "1.1", authorId: 73855012 }
        ]);
      }
    }
    fetchTopSellers();
  }, []);

  // All your existing style functions stay the same...
  function getGridStyle() {
    const w = window.innerWidth;
    if (w <= 600) {
      return {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "1.1rem",
        padding: 0,
        margin: 0,
        listStyle: "none",
      };
    } else if (w <= 900) {
      return {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "1.3rem 1.2rem",
        padding: 0,
        margin: 0,
        listStyle: "none",
      };
    }
    return {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: "1.25rem 0.8rem",
      padding: 0,
      margin: 0,
      listStyle: "none",
    };
  }

  function getProfileImageStyle() {
    const w = window.innerWidth;
    let size = 50;
    if (w <= 600) size = 36;
    else if (w <= 900) size = 42;
    return {
      width: size,
      height: size,
      borderRadius: "50%",
      border: "3px solid #fff",
      backgroundColor: "#fff",
      boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
      objectFit: "cover",
      display: "block",
    };
  }

  function getItemStyle() {
    return {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "0.13rem 0",
    };
  }

  const positionStyle = {
    fontWeight: "700",
    fontSize: "1rem",
    color: "#8b96a5",
    minWidth: 20,
    textAlign: "right",
  };

  const textContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    lineHeight: 1.13,
    marginRight: "auto",
  };

  const nameStyle = {
    fontWeight: "900",
    fontSize: "1.13rem",
    letterSpacing: 0,
    color: "#212529",
    margin: 0,
    textDecoration: "none",
    whiteSpace: "nowrap",
    lineHeight: 1.05,
    marginBottom: "0.09em",
  };

  const priceStyle = {
    fontWeight: 700,
    fontSize: "0.98rem",
    color: "#8b96a5",
    margin: 0,
    padding: 0,
    lineHeight: 1,
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
    fontSize: "9px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #fff",
    boxShadow: "0 1px 4px rgba(100,100,220,0.08)"
  };

  return (
    <section 
      id="section-popular" 
      className="pb-5"
      style={{ 
        paddingTop: "80px", 
        paddingBottom: "100px" // Add extra bottom padding
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-delay="100">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div 
            className="col-md-12" 
            style={{ marginTop: "38px" }}
            data-aos="fade-up" 
            data-aos-delay="300"
          >
            <ol style={getGridStyle()}>
              {sellers.map((seller, index) => (
                <li 
                  key={seller.id} 
                  style={getItemStyle()}
                  data-aos="zoom-in" 
                  data-aos-delay={400 + (index * 50)}
                  data-aos-duration="600"
                >
                  <span style={positionStyle}>{index + 1}.</span>
                  <div style={{ position: "relative" }}>
                    <img
                      src={seller.authorImage}
                      alt={seller.authorName}
                      style={getProfileImageStyle()}
                    />
                    <i className="fa fa-check" style={checkIconStyle}></i>
                  </div>
                  <div style={textContainerStyle}>
                    <Link to={`/author/${seller.authorId}`} style={nameStyle}>
                      {seller.authorName}
                    </Link>
                    <span style={priceStyle}>
                      {seller.price} ETH
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;

