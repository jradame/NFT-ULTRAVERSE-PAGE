import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/AuthorItems";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getUserById } from "../data/userData"; // ✅ Import helper function

const Author = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const authorData = location.state?.collection;
  const [copied, setCopied] = useState(false);

  // ✅ Get consistent user data
  const userData = getUserById(id) || authorData?.userData;

  useEffect(() => {
    if (!authorData && !userData) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [authorData, userData, navigate]);

  const copyWalletAddress = () => {
    if (userData?.walletAddress) {
      navigator.clipboard.writeText(userData.walletAddress).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!authorData && !userData) {
    return (
      <>
        <Nav />
        <div className="container my-5">
          <div className="text-center">
            <h2>Author Not Found</h2>
            <p>No author data available.</p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // ✅ Use consistent user data throughout
  const displayUser = userData || {
    name: authorData?.authorName,
    avatar: authorData?.authorImage,
    username: authorData?.authorName?.toLowerCase().replace(/\s+/g, ''),
    followerCount: 1000,
    walletAddress: authorData?.walletAddress || "0x742d35Cc6A3b4C7C1A9B8E9F2D1C" + id?.padStart(4, '0')
  };

  const username = `@${displayUser.username || displayUser.name?.toLowerCase().replace(/\s+/g, '')}`;

  return (
    <div id="wrapper">
      <Nav />
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={displayUser.avatar} alt={displayUser.name} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {displayUser.name}
                          <span className="profile_username">{username}</span>
                          <span id="wallet" className="profile_wallet">
                            {displayUser.walletAddress}
                          </span>
                          <button 
                            id="btn_copy" 
                            title="Copy Text"
                            onClick={copyWalletAddress}
                            style={{
                              backgroundColor: copied ? '#28a745' : '',
                              color: copied ? 'white' : ''
                            }}
                          >
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {displayUser.followerCount?.toLocaleString() || '1,000'} followers
                      </div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {/* ✅ Pass consistent author data */}
                  <AuthorItems 
                    authorData={{
                      ...authorData,
                      authorName: displayUser.name,
                      authorImage: displayUser.avatar,
                      id: id
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Author;
