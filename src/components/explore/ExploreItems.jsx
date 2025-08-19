import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(8);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update countdown every second
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
          title: "Pinky Ocean", 
          price: 5.07, 
          likes: 69, 
          nftImage: "https://via.placeholder.com/300x200/ff69b4/ffffff?text=Pinky+Ocean", 
          authorImage: "https://via.placeholder.com/50x50/007bff/ffffff?text=A",
          expiryDate: Date.now() + 43 * 60 * 1000 + 45 * 1000
        },
        { 
          id: 2, 
          title: "Deep Sea Phantasy", 
          price: 0.17, 
          likes: 99, 
          nftImage: "https://via.placeholder.com/300x200/006994/ffffff?text=Deep+Sea", 
          authorImage: "https://via.placeholder.com/50x50/28a745/ffffff?text=B",
          expiryDate: Date.now() + 2 * 60 * 60 * 1000 + 43 * 60 * 1000 + 45 * 1000
        },
        { 
          id: 3, 
          title: "Rainbow Style", 
          price: 0.18, 
          likes: 17, 
          nftImage: "https://via.placeholder.com/300x200/ffc107/ffffff?text=Rainbow", 
          authorImage: "https://via.placeholder.com/50x50/dc3545/ffffff?text=C",
          expiryDate: Date.now() + 1 * 60 * 60 * 1000 + 15 * 60 * 1000
        },
        { 
          id: 4, 
          title: "Two Tigers", 
          price: 0.77, 
          likes: 16, 
          nftImage: "https://via.placeholder.com/300x200/fd7e14/ffffff?text=Tigers", 
          authorImage: "https://via.placeholder.com/50x50/6f42c1/ffffff?text=D",
          expiryDate: Date.now() + 3 * 60 * 60 * 1000 + 22 * 60 * 1000
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
      // Timer expired - reset to new random time (1-24 hours)
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

  // Skeleton loading styles
  const skeletonStyle = {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    animation: "pulse 1.5s ease-in-out infinite alternate"
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

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="col-lg-3 col-md-6 mb-3">
      <div style={cardStyle}>
        {/* Header skeleton */}
        <div style={headerStyle}>
          <div style={{ ...skeletonStyle, width: "32px", height: "32px", borderRadius: "50%" }}></div>
          <div style={{ ...skeletonStyle, width: "80px", height: "20px", borderRadius: "16px" }}></div>
        </div>
        
        {/* Image skeleton */}
        <div style={{ ...skeletonStyle, ...imageStyle }}></div>
        
        {/* Title skeleton */}
        <div style={{ ...skeletonStyle, width: "70%", height: "20px", marginBottom: "8px" }}></div>
        
        {/* Price skeleton */}
        <div style={{ ...skeletonStyle, width: "50%", height: "16px", marginBottom: "4px" }}></div>
        
        {/* Likes skeleton */}
        <div style={{ ...skeletonStyle, width: "40%", height: "14px" }}></div>
      </div>
    </div>
  );

  return (
    <div>
      {/* CSS for pulse animation */}
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
          // Show 8 skeleton cards while loading
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))
        ) : (
          // Show actual cards when loaded
          items.slice(0, visible).map(item => (
            <div key={item.id} className="col-lg-3 col-md-6 mb-3">
              <div style={cardStyle}>
                {/* Header with author and countdown */}
                <div style={headerStyle}>
                  <div style={{ position: "relative" }}>
                    <img src={item.authorImage} alt="Author" style={authorImageStyle} />
                    <i className="fa fa-check" style={checkmarkStyle}></i>
                  </div>
                  <div style={countdownStyle}>
                    {calculateCountdown(item.expiryDate, item.id)}
                  </div>
                </div>

                {/* NFT Image */}
                <Link to="/item-details">
                  <img src={item.nftImage} alt={item.title} style={imageStyle} />
                </Link>

                {/* Item Info */}
                <Link to="/item-details" style={{ textDecoration: "none" }}>
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

      {!loading && visible < items.length && visible < 16 && (
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



