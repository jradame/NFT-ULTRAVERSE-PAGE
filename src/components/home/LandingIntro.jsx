import React from "react";

const LandingIntro = () => {
  return (
    <section 
      id="section-intro" 
      className="no-top no-bottom" 
      style={{ 
        paddingTop: "80px", 
        marginTop: "60px", 
        paddingBottom: "60px" 
      }}
    >
      <div className="container">
        <div className="row" style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
          <div 
            className="col-lg-4 col-md-6 mb-sm-30" 
            style={{ 
              paddingLeft: "2rem", 
              paddingRight: "2rem", 
              marginBottom: "3rem" 
            }}
            data-aos="fade-up" 
            data-aos-delay="200"
            data-aos-duration="1000"
          >
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
          <div 
            className="col-lg-4 col-md-6 mb-sm-30" 
            style={{ 
              paddingLeft: "2rem", 
              paddingRight: "2rem", 
              marginBottom: "3rem" 
            }}
            data-aos="fade-up" 
            data-aos-delay="500"
            data-aos-duration="1000"
          >
            <div className="feature-box f-boxed style-3" style={{ marginBottom: "40px" }}>
              <i className="bg-color-2 i-boxed icon_cloud-upload_alt"></i>
              <div className="text" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <h4>Add your NFTs</h4>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div 
            className="col-lg-4 col-md-6 mb-sm-30" 
            style={{ 
              paddingLeft: "2rem", 
              paddingRight: "2rem", 
              marginBottom: "3rem" 
            }}
            data-aos="fade-up" 
            data-aos-delay="800"
            data-aos-duration="1000"
          >
            <div className="feature-box f-boxed style-3" style={{ marginBottom: "40px" }}>
              <i className="bg-color-2 i-boxed icon_tags_alt"></i>
              <div className="text" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                <h4>Sell your NFTs</h4>
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
  );
};

export default LandingIntro;


