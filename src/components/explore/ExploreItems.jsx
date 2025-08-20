import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("API Error:", error);
      setItems([
        {
          id: 1,
          nftId: 10147817,
          title: "Pinky Ocean",
          price: 5.07,
          likes: 69,
          nftImage: "https://nft-place.web.app/static/media/static-1.0299eed903ee71c8c953.jpg",
          authorImage: "https://nft-place.web.app/static/media/author-1.04ee784f53cbe427d362.jpg",
          authorId: 83937449,
          expiryDate: Date.now() + 43 * 60 * 1000 + 45 * 1000
        },
        {
          id: 2,
          nftId: 92975188,
          title: "Deep Sea Phantasy",
          price: 0.17,
          likes: 99,
          nftImage: "https://nft-place.web.app/static/media/static-2.f38fe0e74860176d8f2d.jpg",
          authorImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
          authorId: 55757699,
          expiryDate: Date.now() + 2 * 60 * 60 * 1000 + 43 * 60 * 1000 + 45 * 1000
        }
      ]);
    }
    setLoading(false);
  };

  const handleFilter = async (e) => {
    const filterValue = e.target.value;
    setFilter(filterValue);
    setLoading(true);
    
    try {
      let url = "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";
      if (filterValue) url += `?filter=${filterValue}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
      setVisible(8);
    } catch (error) {
      console.error("Filter Error:", error);
    }
    setLoading(false);
  };

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

  const showMore = () => {
    setVisible(prev => Math.min(prev + 4, 16));
  };

  const cardStyle = {
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    padding: "12px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease"
  };

  const imageStyle = {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px"
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  };

  const authorImageStyle = {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    position: "relative"
  };

  const checkmarkStyle = {
    position: "absolute",
    bottom: "-2px",
    right: "-2px",
    backgroundColor: "#5a5af7",
    color: "white",
    borderRadius: "50%",
    width: "14px",
    height: "14px",
    fontSize: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid white"
  };

  const countdownStyle = {
    backgroundColor: "rgba(255,255,255,0.9)",
    border: "1px solid #e0e0e0",
    borderRadius: "16px",
    padding: "4px 10px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#333"
  };

  const titleStyle = {
    fontSize: "16px",
    fontWeight: "700",
    margin: "8px 0 4px 0",
    color: "#212529"
  };

  const priceStyle = {
    fontSize: "14px",
    fontWeight: "600",
    color: "#5a5af7",
    margin: "0 0 4px 0"
  };

  const likesStyle = {
    fontSize: "13px",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  };

  const SkeletonCard = () => (
    <div className="col-lg-3 col-md-6 mb-3">
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, width: "32px", height: "32px", borderRadius: "50%" }}></div>
          <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, width: "80px", height: "20px", borderRadius: "16px" }}></div>
        </div>
        <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, ...imageStyle }}></div>
        <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, width: "70%", height: "20px", marginBottom: "8px" }}></div>
        <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, width: "50%", height: "16px", marginBottom: "4px" }}></div>
        <div style={{ ...{ backgroundColor: "#f0f0f0", animation: "pulse 1.5s ease-in-out infinite alternate" }, width: "40%", height: "14px" }}></div>
      </div>
    </div>
  );

  return (
    <div>
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            100% { opacity: 0.4; }
          }
        `}
      </style>

      <select value={filter} onChange={handleFilter} style={{ marginBottom: "20px", padding: "8px" }}>
        <option value="">Default</option>
        <option value="price_low_to_high">Price Low to High</option>
        <option value="price_high_to_low">Price High to Low</option>
        <option value="likes_high_to_low">Most Liked</option>
      </select>

      <div className="row">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : (
          items.slice(0, visible).map(item => (
            <div key={item.id} className="col-lg-3 col-md-6 mb-3">
              <div style={cardStyle}>
                <div style={headerStyle}>
                  <Link to={`/author/${item.authorId}`} style={{ position: "relative" }}>
                    <img src={item.authorImage} alt="Author" style={authorImageStyle} />
                    <i className="fa fa-check" style={checkmarkStyle}></i>
                  </Link>
                  <div style={countdownStyle}>
                    {calculateCountdown(item.expiryDate, item.id)}
                  </div>
                </div>

                {/* UPDATED: Dynamic NFT link */}
                <Link to={`/item-details/${item.nftId}`}>
                  <img src={item.nftImage} alt={item.title} style={imageStyle} />
                </Link>

                {/* UPDATED: Dynamic NFT link */}
                <Link to={`/item-details/${item.nftId}`} style={{ textDecoration: "none" }}>
                  <h5 style={titleStyle}>{item.title}</h5>
                </Link>
                <div style={priceStyle}>{item.price} ETH</div>
                <div style={likesStyle}>
                  <i className="fa fa-heart" style={{ color: "#ff6b6b" }}></i>
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {visible < items.length && visible < 16 && !loading && (
        <div className="text-center mt-4">
          <Link 
            to="#" 
            className="btn-main lead"
            onClick={(e) => {
              e.preventDefault();
              showMore();
            }}
          >
            Load More
          </Link>
        </div>
      )}
    </div>
  );
};

export default ExploreItems;




