import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorImage from "../images/author_thumbnail.jpg";
import AuthorItems from "../components/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams() || {}; 
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  const currentAuthorId = authorId || "73855012";

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthor();
  }, [currentAuthorId]);

  const fetchAuthor = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${currentAuthorId}`
      );
      const data = await response.json();
      
      console.log("Author API Response:", data);
      
      setAuthor({
        authorId: data.authorId,
        authorImage: data.authorImage,
        authorName: data.authorName,
        username: data.tag,
        address: data.address,
        followers: data.followers,
        nftCollection: data.nftCollection || []
      });
      
      // Set initial follower count
      setFollowerCount(data.followers || 0);
    } catch (error) {
      console.error("Error fetching author:", error);
      setAuthor({
        authorId: currentAuthorId,
        authorImage: AuthorImage,
        authorName: "Monica Lucas",
        username: "monicaaaa",
        address: "DdzFFzCqrhsMSxb9oWxb...",
        followers: 506,
        nftCollection: []
      });
      setFollowerCount(506);
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    if (!author?.address) return;
    
    setCopying(true);
    try {
      await navigator.clipboard.writeText(author.address);
      setTimeout(() => setCopying(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopying(false);
    }
  };

  const toggleFollow = () => {
    if (isFollowing) {
      // Unfollow: decrease count
      setFollowerCount(prev => prev - 1);
      setIsFollowing(false);
    } else {
      // Follow: increase count
      setFollowerCount(prev => prev + 1);
      setIsFollowing(true);
    }
  };

  return (
    <div id="wrapper">      
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
                      <img src={author?.authorImage || AuthorImage} alt={author?.authorName} />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author?.authorName || "Loading..."}
                          <span className="profile_username">
                            @{author?.username || "loading"}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {author?.address || "Loading address..."}
                          </span>
                          <button 
                            id="btn_copy" 
                            title="Copy Text"
                            onClick={copyToClipboard}
                            disabled={copying || !author?.address}
                          >
                            {copying ? "Copied!" : "Copy"}
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {followerCount} followers
                      </div>
                      <Link 
                        to="#" 
                        className={`btn-main ${isFollowing ? 'btn-following' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFollow();
                        }}
                        style={{
                          backgroundColor: isFollowing ? '#28a745' : '#8364e2',
                          color: 'white',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorData={author} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;



