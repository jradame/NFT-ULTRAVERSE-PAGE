import React, { useState } from "react";
import { Link } from "react-router-dom";
import ultraverseLogo from "../images/Ultraverse.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0f0f0', padding: '15px 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            {/* Logo */}
            <div>
              <Link to="/">
                <img src={ultraverseLogo} alt="Ultraverse" style={{ height: '35px' }} />
              </Link>
            </div>

            {/* Search - Desktop Only */}
            <div className="d-none d-md-block" style={{ flex: 1, maxWidth: '400px', margin: '0 20px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="search item here..."
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 20px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '25px',
                    backgroundColor: '#f9fafb',
                    fontSize: '14px'
                  }}
                />
                <i className="fa fa-search" style={{ 
                  position: 'absolute', 
                  right: '15px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#9ca3af' 
                }}></i>
              </div>
            </div>

            {/* Desktop Menu - Only HOME/EXPLORE/CONNECT WALLET */}
            <div className="d-none d-lg-flex align-items-center">
              <Link to="/" style={{ marginRight: '30px', textDecoration: 'none', color: '#6b7280', fontWeight: '500' }}>
                Home
              </Link>
              <Link to="/explore" style={{ marginRight: '30px', textDecoration: 'none', color: '#8b5cf6', fontWeight: '600' }}>
                Explore
              </Link>
              <button style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                padding: '10px 24px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Connect wallet
              </button>
            </div>

            {/* Purple Hamburger Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="d-lg-none"
              style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                cursor: 'pointer'
              }}
            >
              <i className="fa fa-bars" style={{ color: 'white', fontSize: '16px' }}></i>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu - Only HOME/EXPLORE/CONNECT WALLET */}
      {isMenuOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100vh', 
          backgroundColor: '#5d50c7', 
          zIndex: 9999, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}>
          <button 
            onClick={() => setIsMenuOpen(false)} 
            style={{ 
              position: 'absolute', 
              top: '20px', 
              right: '20px', 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              fontSize: '28px', 
              cursor: 'pointer', 
              padding: '10px' 
            }}
          >
            ×
          </button>
          
          <div style={{ textAlign: 'center' }}>
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)} 
              style={{ 
                display: 'block', 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '32px', 
                fontWeight: '300', 
                marginBottom: '20px' 
              }}
            >
              Home
            </Link>
            
            <Link 
              to="/explore" 
              onClick={() => setIsMenuOpen(false)} 
              style={{ 
                display: 'block', 
                color: 'white', 
                textDecoration: 'none', 
                fontSize: '32px', 
                fontWeight: '300', 
                marginBottom: '40px' 
              }}
            >
              Explore
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(false)} 
              style={{ 
                backgroundColor: '#8b5cf6', 
                color: 'white', 
                border: 'none', 
                borderRadius: '25px', 
                padding: '15px 35px', 
                fontWeight: '600', 
                fontSize: '18px', 
                cursor: 'pointer' 
              }}
            >
              Connect wallet
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;




