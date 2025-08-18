import React from "react";
import { Link } from "react-router-dom";
import nftImage from "../../images/nft.png";

const LandingIntro = () => {
  return (
    <>
      {/* Hero Section - Create, sell or collect digital items */}
      <section id="section-hero" className="no-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="spacer-single"></div>
              <h6>
                <span className="text-uppercase id-color-2">GIGALAND MARKET</span>
              </h6>
              <div className="spacer-10"></div>
              <h1>Create, sell or collect digital items.</h1>
              <p className="lead">
                Unit of data stored on a digital ledger, called a blockchain, that
                certifies a digital asset to be unique and therefore not
                interchangeable
              </p>
              <div className="spacer-10"></div>
              <Link className="btn-main" to="/explore">
                Explore
              </Link>
              <div className="mb-sm-30"></div>
            </div>
            <div className="col-lg-6">
              <div className="items_filter" style={{ marginTop: "20px" }}>
                <img 
                  src={nftImage} 
                  className="lazy img-fluid" 
                  alt="NFT Hero"
                  style={{ marginTop: "20px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process Section with increased top and internal spacing */}
      <section id="section-intro" className="no-top no-bottom" style={{ paddingTop: "80px", marginTop: "60px", paddingBottom: "60px" }}>
        <div className="container">
          <div className="row" style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
            <div className="col-lg-4 col-md-6 mb-sm-30" style={{ paddingLeft: "2rem", paddingRight: "2rem", marginBottom: "3rem" }}>
              <div className="feature-box f-boxed style-3" style={{ marginBottom: "40px" }}>
                <i className="bg-color-2 i-boxed icon_wallet"></i>
                <div className="text" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <h4>Set up your wallet</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
                <i className="wm icon_wallet"></i>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-sm-30" style={{ paddingLeft: "2rem", paddingRight: "2rem", marginBottom: "3rem" }}>
              <div className="feature-box f-boxed style-3" style={{ marginBottom: "40px" }}>
                <i className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
                <div className="text" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <h4>Add your NFT&apos;s</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
                <i className="wm icon_cloud-upload_alt"></i>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-sm-30" style={{ paddingLeft: "2rem", paddingRight: "2rem", marginBottom: "3rem" }}>
              <div className="feature-box f-boxed style-3" style={{ marginBottom: "40px" }}>
                <i className="bg-color-2 i-boxed icon_tags_alt"></i>
                <div className="text" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                  <h4>Sell your NFT&apos;s</h4>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque laudantium, totam rem.
                  </p>
                </div>
                <i className="wm icon_tags_alt"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingIntro;
