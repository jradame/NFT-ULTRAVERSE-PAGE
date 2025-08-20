import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";

const AuthorItems = ({ authorData }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (authorData && authorData.nftCollection) {
      const processedItems = authorData.nftCollection.map(item => ({
        id: item.id,
        nftId: item.nftId, // Make sure to include nftId
        nftImage: item.nftImage,
        authorImage: authorData.authorImage || AuthorImage,
        title: item.title,
        price: `${item.price} ETH`,
        likes: item.likes,
        expiryDate: Date.now() + Math.random() * 8 * 60 * 60 * 1000
      }));
      setItems(processedItems);
      setLoading(false);
    } else if (authorData && authorData.nftCollection && authorData.nftCollection.length === 0) {
      setItems([]);
      setLoading(false);
    }
  }, [authorData]);

  const calculateCountdown = (expiryDate, itemId) => {
    if (!expiryDate) return "EXPIRED";
    
    const now = currentTime.getTime();
    const expiry = new Date(expiryDate).getTime();
    const difference = expiry - now;
    
    if (difference > 0) {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
      } else {
        return `${minutes}m ${seconds}s`;
      }
    } else {
      const newExpiry = Date.now() + Math.random() * 24 * 60 * 60 * 1000;
      
      setItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, expiryDate: newExpiry }
            : item
        )
      );
      
      return "RESETTING...";
    }
  };

  if (loading || !authorData) {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            <div className="col-12 text-center" style={{ padding: "60px 0" }}>
              <h4>Loading NFTs...</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.length > 0 ? (
            items.map((item) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/author/${authorData.authorId}`}>
                      <img className="lazy" src={item.authorImage || AuthorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">
                    {calculateCountdown(item.expiryDate, item.id)}
                  </div>
                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="#" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="#">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* UPDATED: Dynamic NFT link */}
                    <Link to={`/item-details/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    {/* UPDATED: Dynamic NFT link */}
                    <Link to={`/item-details/${item.nftId}`}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price}</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center" style={{ padding: "60px 0" }}>
              <h4>No NFTs found</h4>
              <p>This author hasn't created any NFTs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;


