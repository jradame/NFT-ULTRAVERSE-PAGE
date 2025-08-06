import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sampleSellerNames = [
    "Monica Lucas", "Lori Hart", "Gayle Hicks", "Stacy Long",
    "Mamie Barnett", "Jimmy Wright", "Claude Banks", "Ida Chapman",
    "Fred Ryan", "Nicholas Daniels", "Karla Sharp", "Franklin Greer"
  ];

  const sellerProfileImages = [
    "https://i.pravatar.cc/150?img=29", "https://i.pravatar.cc/150?img=30",
    "https://i.pravatar.cc/150?img=31", "https://i.pravatar.cc/150?img=32",
    "https://i.pravatar.cc/150?img=33", "https://i.pravatar.cc/150?img=34",
    "https://i.pravatar.cc/150?img=35", "https://i.pravatar.cc/150?img=36",
    "https://i.pravatar.cc/150?img=37", "https://i.pravatar.cc/150?img=38",
    "https://i.pravatar.cc/150?img=39", "https://i.pravatar.cc/150?img=40"
  ];

  const samplePrices = [
    "12.0", "7.2", "2.7", "1.3", "4.4", "2.8", 
    "3.8", "5.2", "0.7", "4.2", "1.2", "1.1"
  ];

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
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchSellers();
  }, []);

  const SkeletonSeller = ({ index }) => (
    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={`skeleton-${index}`}>
      <div className="top-seller-item text-center">
        <div 
          className="skeleton-circle"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            margin: '0 auto 15px auto',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
        <div 
          className="skeleton-text"
          style={{
            width: '70%',
            height: '18px',
            margin: '0 auto 8px auto',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
        <div 
          className="skeleton-text"
          style={{
            width: '50%',
            height: '14px',
            margin: '0 auto',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite'
          }}
        />
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
              const stateData = {
                collection: {
                  ...seller,
                  id: seller.id || index + 1,
                  authorName: sampleSellerNames[index % sampleSellerNames.length],
                  creatorName: sampleSellerNames[index % sampleSellerNames.length],
                  authorImage: sellerProfileImages[index % sellerProfileImages.length],
                  creatorImage: sellerProfileImages[index % sellerProfileImages.length],
                  price: samplePrices[index % samplePrices.length],
                  views: Math.floor(Math.random() * 2000) + 500,
                  likes: Math.floor(Math.random() * 200) + 50,
                  title: `${sampleSellerNames[index % sampleSellerNames.length]}'s Collection #${seller.id || index + 1}`,
                  nftImage: seller.authorImage || sellerProfileImages[index % sellerProfileImages.length]
                },
              };

              return (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 mb-4" key={seller.id || index}>
                  <div className="top-seller-item text-center">
                    <Link 
                      to={`/author/${seller.id || index + 1}`} 
                      state={stateData}
                      className="text-decoration-none"
                    >
                      <div className="position-relative d-inline-block mb-3">
                        <img 
                          src={sellerProfileImages[index % sellerProfileImages.length]}
                          alt={sampleSellerNames[index % sampleSellerNames.length]}
                          className="rounded-circle"
                          width={60}
                          height={60}
                          style={{ objectFit: 'cover' }}
                        />
                        <i 
                          className="fa fa-check position-absolute"
                          style={{
                            bottom: "2px",
                            right: "2px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            fontSize: "10px",
                            padding: "2px",
                            color: "#007bff"
                          }}
                        />
                      </div>
                      <h6 className="mb-1 text-dark">
                        {sampleSellerNames[index % sampleSellerNames.length]}
                      </h6>
                      <span className="text-muted">
                        {samplePrices[index % samplePrices.length]} ETH
                      </span>
                    </Link>
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







