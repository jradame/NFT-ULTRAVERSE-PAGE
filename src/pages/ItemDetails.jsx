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
        price: "1.85",
        ownerName: "Monica Lucas",
        ownerImage: AuthorImage,
        ownerId: "73855012",
        creatorName: "Monica Lucas", 
        creatorImage: AuthorImage,
        creatorId: "73855012"
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
                  
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img 
                              className="lazy" 
                              src={item.ownerImage || AuthorImage} 
                              alt={item.ownerName} 
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>
                            {item.ownerName || "Unknown Owner"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img 
                              className="lazy" 
                              src={item.creatorImage || AuthorImage} 
                              alt={item.creatorName} 
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorId}`}>
                            {item.creatorName || "Unknown Creator"}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="Ethereum" />
                      <span>{item.price || "N/A"}</span>
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







