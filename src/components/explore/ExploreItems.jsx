import React, { useEffect, useState } from "react";

const ExploreItems = () => {
  const [exploreData, setExploreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedItems, setDisplayedItems] = useState(8);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchExploreData();
  }, []);

  const fetchExploreData = async () => {
    try {
      const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
      const data = await response.json();
      
      const maxData = data.slice(0, 16);
      setAllData(maxData);
      setExploreData(maxData.slice(0, 8));
    } catch (error) {
      console.error("Failed to fetch explore data:", error);
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const loadMoreItems = () => {
    if (displayedItems >= 16 || displayedItems >= allData.length) {
      return;
    }

    setLoadingMore(true);
    
    setTimeout(() => {
      const newDisplayCount = Math.min(displayedItems + 4, 16, allData.length);
      setDisplayedItems(newDisplayCount);
      setExploreData(allData.slice(0, newDisplayCount));
      setLoadingMore(false);
    }, 500);
  };

  const canLoadMore = displayedItems < 16 && displayedItems < allData.length;

  // Countdown Timer Component - WHITE BACKGROUND
  const CountdownTimer = ({ expiryDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = new Date(expiryDate).getTime() - now;

        if (distance > 0) {
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          setTimeLeft(`${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
        } else {
          setTimeLeft('Expired');
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [expiryDate]);

    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)', // WHITE BACKGROUND
        color: '#333', // DARK TEXT
        padding: '6px 12px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: '600',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', // ENHANCED SHADOW
        backdropFilter: 'blur(10px)' // MODERN BLUR EFFECT
      }}>
        {timeLeft}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="row" style={{ margin: '0 -15px' }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="col-6 col-md-4 col-lg-3" style={{ marginBottom: '3rem', padding: '0 15px' }}>
            <div style={{ 
              backgroundColor: 'white',
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f1f1f1'
            }}>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e0e0e0' }}></div>
                  <div style={{ background: '#e0e0e0', padding: '6px 12px', borderRadius: '12px', fontSize: '11px' }}>Loading...</div>
                </div>
                <div style={{ height: '280px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', borderRadius: '12px' }}>Loading...</div>
              </div>
              <div style={{ padding: '16px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>Loading...</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '16px', color: '#8b5cf6', fontWeight: '700' }}>--- ETH</div>
                  <div style={{ fontSize: '14px', color: '#666' }}>❤️ ---</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="row" style={{ margin: '0 -15px' }}>
        {exploreData.map((item, index) => {
          const randomDays = Math.floor(Math.random() * 7) + 1;
          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + randomDays);
          const randomLikes = Math.floor(Math.random() * 50) + 1;

          return (
            <div key={item.id || index} className="col-6 col-md-4 col-lg-3" style={{ marginBottom: '3rem', padding: '0 15px' }}>
              <div style={{ 
                backgroundColor: 'white',
                borderRadius: '16px', 
                overflow: 'hidden', 
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                border: '1px solid #f1f1f1'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
              }}>
                
                {/* TOP WHITE SPACE with Avatar and Timer */}
                <div style={{ padding: '16px' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}>
                    {/* Avatar - LEFT in white space */}
                    <img 
                      src={item.authorImage || `https://i.pravatar.cc/48?img=${index + 1}`}
                      alt="Creator"
                      style={{ 
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: '3px solid #fff',
                        boxShadow: '0 3px 12px rgba(0,0,0,0.15)'
                      }}
                    />
                    
                    {/* Timer - RIGHT in white space */}
                    <CountdownTimer expiryDate={expiryDate} />
                  </div>
                  
                  {/* UNOBSTRUCTED NFT Image */}
                  <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
                    <img 
                      src={item.nftImage} 
                      alt={item.title} 
                      style={{ 
                        width: '100%', 
                        height: '280px',
                        objectFit: 'cover',
                        borderRadius: '12px'
                      }}
                    />
                  </div>
                </div>

                {/* BOTTOM WHITE SPACE with name, price, and likes */}
                <div style={{ padding: '16px' }}>
                  {/* Creator Name */}
                  <div style={{ 
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.title}
                  </div>
                  
                  {/* Price and Likes on same line */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    {/* Price - BOTTOM LEFT */}
                    <div style={{ 
                      fontSize: '16px', 
                      color: '#8b5cf6', 
                      fontWeight: '700'
                    }}>
                      {item.price} ETH
                    </div>
                    
                    {/* Likes - BOTTOM RIGHT */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <span style={{ color: '#ff4757', marginRight: '4px', fontSize: '14px' }}>❤️</span>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                        {item.likes || randomLikes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Load More Button */}
      {canLoadMore && (
        <div className="row" style={{ marginTop: '4rem' }}>
          <div className="col-12" style={{ textAlign: 'center' }}>
            <button 
              onClick={loadMoreItems}
              disabled={loadingMore}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                padding: '16px 40px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: loadingMore ? 'not-allowed' : 'pointer',
                opacity: loadingMore ? 0.6 : 1,
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
              }}
            >
              {loadingMore ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreItems;








