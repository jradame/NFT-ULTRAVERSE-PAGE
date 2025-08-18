// src/pages/Author.jsx
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import AuthorImage from "../images/author_thumbnail.jpg";

const Author = () => {
  const { authorId } = useParams();
  const location = useLocation();
  const passedState = location.state?.collection || null;

  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(573);
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        setLoading(true);
        if (passedState) {
          setAuthorData(passedState);
          setFollowerCount(passedState.followers || 573);
          setIsFollowing(false);
        } else {
          const response = await fetch(
            `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId || '73855012'}`
          );
          const data = await response.json();
          setAuthorData(data);
          setFollowerCount(data.followers || 573);
        }
      } catch (error) {
        console.error('Error fetching author data:', error);
        setAuthorData({
          authorName: "Monica Lucas",
          authorImage: AuthorImage,
          tag: "@monicaaaa",
          address: "DefaultWalletAddress",
          followers: 573
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [authorId, passedState]);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(isFollowing ? followerCount - 1 : followerCount + 1);
  };

  const copyToClipboard = () => {
    const walletAddress = authorData?.address;
    navigator.clipboard.writeText(walletAddress)
      .then(() => alert('Wallet address copied to clipboard!'))
      .catch(err => console.error('Failed to copy: ', err));
  };

  if (loading) {
    return <div style={{ padding: '100px' }}><h4>Loading author data...</h4></div>;
  }

  return (
    <div>
      <section
        id="profile_banner"
        className="text-light"
        style={{ background: `url(${AuthorBanner}) top` }}
      ></section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <img src={authorData?.authorImage || AuthorImage} alt={authorData?.authorName} />
                    <i className="fa fa-check"></i>
                    <div className="profile_name">
                      <h4>
                        {authorData?.authorName}
                        <span className="profile_username">{authorData?.tag}</span>
                        <span className="profile_wallet">{authorData?.address}</span>
                        <button onClick={copyToClipboard}>Copy</button>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">
                      {followerCount} followers
                    </div>
                    <button className="btn-main" onClick={handleFollowClick}>
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="de_tab tab_simple">
                <AuthorItems authorId={authorId} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Author;




