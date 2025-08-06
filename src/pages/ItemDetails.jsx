// src/pages/ItemDetails.jsx

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import EthIcon from "../images/ethereum.svg";

const ItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const collection = location.state?.collection;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collection) {
      navigate("/");
    } else {
      setTimeout(() => setLoading(false), 800);
    }
    window.scrollTo(0, 0);
  }, [collection, navigate]);

  if (!collection) return null;

  const {
    title,
    id,
    nftImage,
    views = 0,
    likes = 0,
    authorImage,
    authorName = "Unknown",
    creatorImage,
    creatorName = "Unknown",
    price = "0.00",
  } = collection;

  return (
    <>
      <Nav />
      <section className="container my-5">
        <div
          className="row align-items-stretch"
          style={{ minHeight: "480px" }}
        >
          {/* Image */}
          <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
            {loading ? (
              <div
                className="skeleton-box w-100"
                style={{
                  height: "100%",
                  borderRadius: "10px",
                }}
              />
            ) : (
              <img
                src={nftImage}
                alt={title}
                className="img-fluid rounded shadow"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  maxHeight: "480px",
                }}
              />
            )}
          </div>

          {/* Text Content */}
          <div className="col-md-6 d-flex flex-column justify-content-center">
            {loading ? (
              <>
                <div className="skeleton-text mb-3" style={{ width: "50%" }} />
                <div className="skeleton-text mb-2" style={{ width: "25%" }} />
                <div className="skeleton-text mb-4" style={{ width: "40%" }} />
              </>
            ) : (
              <>
                <h2>
                  {title} <span className="text-muted">#{id}</span>
                </h2>

                <div className="d-flex mb-3 text-muted">
                  <div className="me-3">
                    <i className="fa fa-eye me-1" /> {views.toLocaleString()}
                  </div>
                  <div>
                    <i className="fa fa-heart me-1" /> {likes.toLocaleString()}
                  </div>
                </div>

                <p className="mb-4">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>

                {/* Owner */}
                <div className="mb-3">
                  <h6>Owner</h6>
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-2">
                      <img
                        src={authorImage}
                        alt={authorName}
                        className="rounded-circle"
                        width={40}
                        height={40}
                      />
                      <i 
                        className="fa fa-check-circle position-absolute text-primary bg-white rounded-circle"
                        style={{
                          bottom: "-2px",
                          right: "-2px",
                          fontSize: "12px",
                          padding: "1px"
                        }}
                      ></i>
                    </div>
                    <strong>{authorName}</strong>
                  </div>
                </div>

                {/* Creator */}
                <div className="mb-3">
                  <h6>Creator</h6>
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-2">
                      <img
                        src={creatorImage || authorImage}
                        alt={creatorName}
                        className="rounded-circle"
                        width={40}
                        height={40}
                      />
                      <i 
                        className="fa fa-check-circle position-absolute text-primary bg-white rounded-circle"
                        style={{
                          bottom: "-2px",
                          right: "-2px",
                          fontSize: "12px",
                          padding: "1px"
                        }}
                      ></i>
                    </div>
                    <strong>{creatorName}</strong>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <h6>Price</h6>
                  <div className="d-flex align-items-center">
                    <img
                      src={EthIcon}
                      alt="Ethereum"
                      width={16}
                      className="me-2"
                    />
                    <strong>{parseFloat(price).toFixed(2)}</strong>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ItemDetails;










