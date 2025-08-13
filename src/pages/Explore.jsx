import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeaderExplore from "../components/explore/HeaderExplore";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const Explore = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <Header />
      
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ 
            background: `url("${SubHeader}") top`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '200px'
          }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <h1>Explore</h1>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section" style={{ padding: '80px 0' }}> {/* ADD MORE PADDING */}
          <div className="container" style={{ maxWidth: '1200px' }}> {/* LIMIT CONTAINER WIDTH */}
            <div className="row" style={{ marginBottom: '40px' }}> {/* ADD SPACING */}
              <HeaderExplore />
            </div>
            <div style={{ padding: '0 20px' }}> {/* ADD HORIZONTAL PADDING */}
              <ExploreItems />
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Explore;




