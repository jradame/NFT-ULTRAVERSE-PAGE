import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById, getUserArtworks } from "../data/userData";

const AuthorItems = ({ authorData }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user data and their specific artworks
  const userData = getUserById(authorData?.id);
  const userArtworks = getUserArtworks(authorData?.id);
  
  const displayAvatar = userData?.avatar || authorData?.authorImage;
  const displayName = userData?.name || authorData?.authorName;

  useEffect(() => {
    if (authorData && userArtworks) {
      setLoading(true);
      setTimeout(() => {
        // Use actual user artworks instead of generating random ones
        const processedArtworks = userArtworks.map((artwork, index) => ({
          ...artwork,
          id: `${authorData.id}-artwork-${index + 1}`,
          nftId: `${authorData.id}${String(index + 1).padStart(3, '0')}`,
          authorName: displayName,
          authorImage: displayAvatar,
          creatorName: displayName,
          creatorImage: displayAvatar,
          createdDate: `202${3 - Math.floor(index / 4)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        }));
        
        setItems(processedArtworks);
        setLoading(false);
      }, 800);
    }
  }, [authorData, userArtworks, displayName, displayAvatar]);

  const SkeletonItem = () => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item">
        <div className="author_list_pp">
          <div 
            className="skeleton-box rounded-circle"
            style={{ 
              width: '50px', 
              height: '50px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        </div>
        <div className="nft__item_wrap">
          <div 
            className="skeleton-box"
            style={{ 
              width: '100%', 
              height: '250px',
              borderRadius: '10px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
        </div>
        <div className="nft__item_info">
          <div 
            className="skeleton-text mb-2"
            style={{ 
              width: '70%', 
              height: '20px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '4px'
            }}
          />
          <div 
            className="skeleton-text mb-2"
            style={{ 
              width: '50%', 
              height: '18px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '4px'
            }}
          />
          <div 
            className="skeleton-text"
            style={{ 
              width: '40%', 
              height: '16px',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite',
              borderRadius: '4px'
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="author-items-section">
      <div className="row">
        <div className="col-12 mb-4">
          <h3>{displayName}'s Artworks ({loading ? '...' : items.length})</h3>
          <p className="text-muted">Explore the complete collection by {displayName}</p>
        </div>
      </div>
      
      <div className="row">
        {loading ? (
          [...Array(6)].map((_, index) => (
            <SkeletonItem key={index} />
          ))
        ) : (
          items.map((item) => {
            const stateData = {
              collection: {
                ...item,
                authorName: displayName,
                creatorName: displayName,
                authorImage: displayAvatar,
                creatorImage: displayAvatar,
              },
            };

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4" key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/item-details/${item.nftId}`} state={stateData}>
                      <div className="position-relative">
                        <img 
                          className="lazy" 
                          src={displayAvatar}
                          alt={displayName}
                          width={50}
                          height={50}
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <i 
                          className="fa fa-check position-absolute"
                          style={{
                            bottom: "0px",
                            right: "0px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            fontSize: "10px",
                            padding: "3px",
                            color: "#007bff",
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                          }}
                        />
                      </div>
                    </Link>
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

                    <Link to={`/item-details/${item.nftId}`} state={stateData}>
                      <img
                        src={item.nftImage}
                        className="lazy nft__item_preview"
                        alt={item.title}
                        style={{
                          width: '100%',
                          height: '250px',
                          objectFit: 'cover',
                          borderRadius: '10px'
                        }}
                      />
                    </Link>

                    {/* Artwork details overlay */}
                    <div className="artwork-details" style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      right: '10px',
                      background: 'rgba(0,0,0,0.8)',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>{item.category}</span>
                        <span className={`rarity-${item.rarity.toLowerCase()}`}>{item.rarity}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="nft__item_info">
                    <Link to={`/item-details/${item.nftId}`} state={stateData}>
                      <h4>{item.title}</h4>
                    </Link>
                    <div className="nft__item_price">
                      {parseFloat(item.price).toFixed(2)} ETH
                    </div>
                    <div className="nft__item_stats" style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '5px'
                    }}>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span style={{ marginLeft: '5px' }}>{item.likes}</span>
                      </div>
                      <div className="nft__item_views">
                        <i className="fa fa-eye"></i>
                        <span style={{ marginLeft: '5px' }}>{item.views}</span>
                      </div>
                      <div className="nft__item_date">
                        {item.createdDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      {!loading && items.length === 0 && (
        <div className="col-12 text-center py-5">
          <h4>No artworks found</h4>
          <p className="text-muted">This artist hasn't created any NFTs yet.</p>
        </div>
      )}
    </div>
  );
};

export default AuthorItems;
