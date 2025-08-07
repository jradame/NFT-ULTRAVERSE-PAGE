import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { USERS_DATA } from "../../data/userData"; // ✅ Import centralized data

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
        );
        const data = await res.json();
        setSellers(data);
      } catch (err) {
        console.error("Failed to load top sellers", err);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchSellers();
  }, []);

  const SkeletonSeller = ({ index }) => (
    <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3" key={`skeleton-${index}`}>
      <div className="seller-row-item">
        <div className="seller-number">{index + 1}.</div>
        <div className="seller-content">
          <div 
            className="seller-avatar-skeleton"
            style={{
              width: '55px',
              height: '55px',
              borderRadius: '50%',
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s infinite'
            }}
          />
          <div className="seller-details">
            <div 
              style={{
                width: '80%',
                height: '16px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px',
                marginBottom: '5px'
              }}
            />
            <div 
              style={{
                width: '60%',
                height: '14px',
                background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="text-center mb-4">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        
        <div className="row">
          {loading ? (
            [...Array(12)].map((_, index) => (
              <SkeletonSeller key={index} index={index} />
            ))
          ) : (
            sellers.slice(0, 12).map((seller, index) => {
              // ✅ USE CENTRALIZED USER DATA for consistency
              const userData = USERS_DATA[index];
              
              const stateData = {
                collection: {
                  ...seller,
                  id: userData.id,
                  authorName: userData.name,
                  creatorName: userData.name,
                  authorImage: userData.avatar,
                  creatorImage: userData.avatar,
                  price: userData.ethBalance,
                  views: Math.floor(Math.random() * 2000) + 500,
                  likes: Math.floor(Math.random() * 200) + 50,
                  title: `${userData.name}'s Collection #${userData.id}`,
                  nftImage: seller.authorImage || userData.avatar,
                  // ✅ Pass all user data for consistency
                  userData: userData
                },
              };

              return (
                <div className="col-lg-3 col-md-6 col-sm-6 col-12 mb-3" key={userData.id}>
                  <div className="seller-row-item">
                    <div className="seller-number">{index + 1}.</div>
                    <div className="seller-content">
                      <Link 
                        to={`/author/${userData.id}`} 
                        state={stateData}
                        className="text-decoration-none seller-link"
                      >
                        <div className="seller-avatar">
                          <img 
                            src={userData.avatar} // ✅ Consistent avatar
                            alt={userData.name}
                            className="avatar-image"
                          />
                          <i className="fa fa-check verification-check" />
                        </div>
                      </Link>
                      <div className="seller-details">
                        <Link 
                          to={`/author/${userData.id}`} 
                          state={stateData}
                          className="text-decoration-none seller-link"
                        >
                          <div className="seller-name">
                            {userData.name} {/* ✅ Consistent name */}
                          </div>
                          <div className="seller-price">
                            {userData.ethBalance} ETH {/* ✅ Consistent price */}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default TopSellers;













