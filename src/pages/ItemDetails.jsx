import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentNftId = nftId || "17914494";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, [currentNftId]);

  const fetchItemDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${currentNftId}`
      );
      const data = await response.json();
      
      console.log("ItemDetails API Response:", data);
      setItem(data);
    } catch (error) {
      console.error("Error fetching item details:", error);
      setItem({
        nftId: currentNftId,
        nftImage: nftImage,
        title: "Rainbow Style",
        description: "doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        views: 100,
        likes: 74,
        price: "0.29",
        ownerName: "Mamie Barnett",
        ownerImage: AuthorImage,
        ownerId: "73855012",
        creatorName: "Jimmy Wright", 
        creatorImage: AuthorImage,
        creatorId: "73855013"
      });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center" style={{ padding: "100px 0" }}>
                  <h3>Loading item details...</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div id="wrapper">
        <div className="no-bottom no-top" id="content">
          <div id="top"></div>
          <section aria-label="section" className="mt90 sm-mt-0">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center" style={{ padding: "100px 0" }}>
                  <h3>Item not found</h3>
                  <p>The requested NFT could not be found.</p>
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src={item.nftImage || nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt={item.title}
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title || "Untitled"} #{item.nftId || currentNftId}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views || 0}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes || 0}
                    </div>
                  </div>
                  
                  <p>
                    {item.description || "No description available for this NFT."}
                  </p>
                  
                  {/* ENHANCED OWNER/CREATOR SECTION */}
                  <div style={{ 
                    marginTop: "30px", 
                    padding: "20px 0"
                  }}>
                    {/* Owner Section */}
                    <div style={{ marginBottom: "32px" }}>
                      <h6 style={{ 
                        fontSize: "20px", 
                        fontWeight: 700, 
                        marginBottom: "12px",
                        color: "#333"
                      }}>
                        Owner
                      </h6>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px"  // Increased from 6px to 12px - names scooted over
                      }}>
                        <div style={{ position: "relative" }}>
                          <Link to={`/author/${item.ownerId}`}>
                            <img 
                              className="lazy" 
                              src={item.ownerImage || AuthorImage} 
                              alt={item.ownerName}
                              style={{ 
                                width: "75px", 
                                height: "75px", 
                                borderRadius: "50%" 
                              }}
                            />
                            <i className="fa fa-check" style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              background: "#7e56da",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              fontSize: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "3px solid #fff",
                            }}></i>
                          </Link>
                        </div>
                        <div>
                          <Link to={`/author/${item.ownerId}`}>
                            <span style={{ 
                              fontWeight: 700, 
                              fontSize: "20px", 
                              color: "#212529",
                              textDecoration: "none"
                            }}>
                              {item.ownerName || "Unknown Owner"}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Creator Section */}
                    <div style={{ marginBottom: "32px" }}>
                      <h6 style={{ 
                        fontSize: "20px", 
                        fontWeight: 700, 
                        marginBottom: "12px",
                        color: "#333"
                      }}>
                        Creator
                      </h6>
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "12px"  // Increased from 6px to 12px - names scooted over
                      }}>
                        <div style={{ position: "relative" }}>
                          <Link to={`/author/${item.creatorId}`}>
                            <img 
                              className="lazy" 
                              src={item.creatorImage || AuthorImage} 
                              alt={item.creatorName}
                              style={{ 
                                width: "75px", 
                                height: "75px", 
                                borderRadius: "50%" 
                              }}
                            />
                            <i className="fa fa-check" style={{
                              position: "absolute",
                              bottom: 0,
                              right: 0,
                              background: "#7e56da",
                              color: "#fff",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              fontSize: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "3px solid #fff",
                            }}></i>
                          </Link>
                        </div>
                        <div>
                          <Link to={`/author/${item.creatorId}`}>
                            <span style={{ 
                              fontWeight: 700, 
                              fontSize: "20px", 
                              color: "#212529",
                              textDecoration: "none"
                            }}>
                              {item.creatorName || "Unknown Creator"}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Price Section */}
                    <div>
                      <h6 style={{ 
                        fontSize: "20px", 
                        fontWeight: 700, 
                        marginBottom: "12px",
                        color: "#333"
                      }}>
                        Price
                      </h6>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <img 
                          src={EthImage} 
                          alt="Ethereum" 
                          style={{ width: "32px", height: "32px" }}
                        />
                        <span style={{
                          fontWeight: 700,
                          fontSize: "28px",
                          color: "#212529"
                        }}>
                          {item.price || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;




