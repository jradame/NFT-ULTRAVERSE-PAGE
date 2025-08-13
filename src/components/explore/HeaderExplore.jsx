import React from "react";

const HeaderExplore = () => {
  return (
    <div className="col-12" style={{ marginBottom: '3rem', textAlign: 'center' }}> {/* INCREASE MARGIN */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <select style={{
          padding: '12px 24px', // INCREASE PADDING
          border: '1px solid #e5e7eb',
          borderRadius: '25px',
          backgroundColor: 'white',
          color: '#6b7280',
          fontSize: '14px',
          fontWeight: '500',
          minWidth: '180px', // INCREASE WIDTH
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)' // ADD SUBTLE SHADOW
        }}>
          <option>Price, Low to High</option>
          <option>Price, High to Low</option>
          <option>Most Liked</option>
          <option>Most Viewed</option>
          <option>Recently Added</option>
        </select>
      </div>
    </div>
  );
};

export default HeaderExplore;



