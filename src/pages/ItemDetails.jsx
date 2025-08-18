import React from "react";
import { useParams, useLocation } from "react-router-dom";

const ItemDetails = () => {
  const { itemId } = useParams();
  const location = useLocation();
  const item = location.state?.collection;

  if (!item) {
    return <p style={{ padding: '80px', textAlign: 'center' }}>Item not found or no data passed.</p>;
  }

  return (
    <section className="container" style={{ padding: "60px 0" }}>
      <h2>{item.title}</h2>
      <img
        src={item.nftImage}
        alt={item.title}
        style={{ maxWidth: "100%", borderRadius: "12px", marginBottom: "20px" }}
      />
      <p><strong>Price:</strong> {item.price} ETH</p>
      <p><strong>Likes:</strong> {item.likes}</p>
    </section>
  );
};

export default ItemDetails;











