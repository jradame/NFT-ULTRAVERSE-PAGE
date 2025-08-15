import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorData }) => {
  const [items, setItems] = useState([]);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchAuthorData = async () => {
      if (!authorData?.id) {
        console.warn("❌ Missing author ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${encodeURIComponent(authorData.id)}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch author data");
        }

        const data = await res.json();
        console.log("✅ Fetched author data:", data);

        if (isMounted) {
          const artworks = data.artworks || []; // Adjust if structure differs
          setAuthorInfo({
            name: data.name || "Unknown",
            avatar: data.avatar || "",
          });
          setItems(artworks);
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error fetching author items:", error);
        if (isMounted) {
          setItems([]);
          setLoading(false);
        }
      }
    };

    fetchAuthorData();

    return () => {
      isMounted = false;
    };
  }, [authorData?.id]);

  const SkeletonItem = () => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
      <div className="nft__item">
        <div className="author_list_pp">
          <div className="skeleton-box rounded-circle" style={skeletonStyle(50, 50)} />
        </div>
        <div className="nft__item_wrap">
          <div className="skeleton-box" style={skeletonStyle("100%", 250)} />
        </div>
        <div className="nft__item_info">
          <div className="skeleton-text mb-2" style={skeletonStyle("70%", 20)} />
          <div className="skeleton-text mb-2" style={skeletonStyle("50%", 18)} />
          <div className="skeleton-text" style={skeletonStyle("40%", 16)} />
        </div>
      </div>
    </div>
  );

  const skeletonStyle = (width, height) => ({
    width,
    height,
    background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
    backgroundSize: '200% 100%',
    animation: 'shimmer 1.5s infinite',
    borderRadius: '4px',
  });

  const displayName = authorInfo?.name || "Unknown";
  const displayAvatar = authorInfo?.avatar || "/default-avatar.jpg";

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
          [...Array(6)].map((_, index) => <SkeletonItem key={index} />)
        ) : items.length ? (
          items.map((item, index) => {
            const stateData = { collection: item };
            const nftId = `${authorData.id}${String(index + 1).padStart(3, '0')}`;

            return (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4" key={nftId}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link to={`/item-details/${nftId}`} state={stateData}>
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
                    <Link to={`/item-details/${nftId}`} state={stateData}>
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
                    <Link to={`/item-details/${nftId}`} state={stateData}>
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
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No artworks found</h4>
            <p className="text-muted">This artist hasn't created any NFTs yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorItems;

