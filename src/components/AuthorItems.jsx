import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AuthorItems = ({ authorData }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Generate NFTs for this specific author
  const generateAuthorNFTs = (authorName, authorId) => {
    const nftTypes = [
      "Digital Art", "Abstract Portrait", "Cyber Landscape", "3D Sculpture", 
      "Pixel Dreams", "Neon Photography", "Future Illustration", "Concept Design"
    ];
    
    return Array.from({ length: 8 }, (_, index) => ({
      id: `${authorId}-${index + 1}`,
      nftId: `${authorId}${String(index + 1).padStart(3, '0')}`,
      title: `${nftTypes[index % nftTypes.length]} #${index + 1}`,
      nftImage: `https://picsum.photos/400/400?random=${authorId}${index}`,
      price: (Math.random() * 5 + 0.1).toFixed(2),
      likes: Math.floor(Math.random() * 200) + 20,
      authorName: authorName,
      authorImage: authorData?.authorImage,
      views: Math.floor(Math.random() * 1500) + 200,
    }));
  };

  useEffect(() => {
    if (authorData) {
      const authorNFTs = generateAuthorNFTs(authorData.authorName, authorData.id);
      setItems(authorNFTs);
      setTimeout(() => setLoading(false), 800);
    }
  }, [authorData]);

  const SkeletonItem = () => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
      <div className="nft__item">
        <div className="author_list_pp">
          <div 
            className="skeleton-box rounded-circle"
            style={{ width: '50px', height: '50px' }}
          />
        </div>
        <div className="nft__item_wrap">
          <div 
            className="skeleton-box"
            style={{ 
              width: '100%', 
              height: '250px',
              borderRadius: '10px'
            }}
          />
        </div>
        <div className="nft__item_info">
          <div 
            className="skeleton-text mb-2"
            style={{ width: '70%', height: '20px' }}
          />
          <div 
            className="skeleton-text mb-2"
            style={{ width: '50%', height: '18px' }}
          />
          <div 
            className="skeleton-text"
            style={{ width: '40%', height: '16px' }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="row">
      {loading ? (
        [...Array(8)].map((_, index) => (
          <SkeletonItem key={index} />
        ))
      ) : (
        items.map((item) => {
          const stateData = {
            collection: {
              ...item,
              authorName: authorData.authorName,
              creatorName: authorData.authorName,
              authorImage: authorData.authorImage,
              creatorImage: authorData.authorImage,
            },
          };

          return (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/item-details/${item.nftId}`}
                    state={stateData}
                  >
                    <div className="position-relative">
                      <img 
                        className="lazy" 
                        src={authorData.authorImage}
                        alt={authorData.authorName}
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
                          padding: "2px",
                          color: "#007bff"
                        }}
                      ></i>
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
                </div>
                
                <div className="nft__item_info">
                  <Link to={`/item-details/${item.nftId}`} state={stateData}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">
                    {parseFloat(item.price).toFixed(2)} ETH
                  </div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default AuthorItems;
