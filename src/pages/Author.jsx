import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";



const Author = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const authorData = location.state?.collection;

  // State for copy functionality
  const [copied, setCopied] = useState(false);

  // Generate a realistic wallet address based on author ID
  const generateWalletAddress = (authorId) => {
    const baseWallet = "0x742d35Cc6A3b4C7C1A9B8E9F2D1C3B4A5F6E8D9C";
    return baseWallet.slice(0, -4) + String(authorId).padStart(4, '0');
  };

  // Generate follower count based on author index
  const generateFollowerCount = (index) => {
    const baseCounts = [573, 1240, 892, 2104, 756, 1876, 1432, 945, 683, 1567, 834, 1299];
    return baseCounts[index % baseCounts.length];
  };

  useEffect(() => {
    if (!authorData) {
      // If no author data, redirect to home
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, [authorData, navigate]);

  // Copy wallet address functionality
  const copyWalletAddress = () => {
    if (authorData) {
      const wallet = generateWalletAddress(id);
      navigator.clipboard.writeText(wallet).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!authorData) {
    return null; // Will redirect in useEffect
  }

  const followerCount = generateFollowerCount(parseInt(id) - 1);
  const walletAddress = generateWalletAddress(id);
  const username = `@${authorData.authorName.toLowerCase().replace(/\s+/g, '')}`;

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
                      <img src={authorData.authorImage} alt={authorData.authorName} />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {authorData.authorName}
                          <span className="profile_username">{username}</span>
                          <span id="wallet" className="profile_wallet">
                            {walletAddress}
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
                      <div className="profile_follower">{followerCount.toLocaleString()} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={authorData} />
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

