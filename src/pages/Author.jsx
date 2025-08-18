import React from 'react';
import { Link } from 'react-router-dom';

const Author = () => {
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        
        <section id="profile_banner" aria-label="section" className="text-light" data-bgimage="url(images/author_banner.jpg) top">
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src="images/author/author-1.jpg" alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          Monica Lucas
                          <span className="profile_username">@monica</span>
                          <span id="wallet" className="profile_wallet">DdzFFzCqrhshMSxb6oNLdSNRNirMLu</span>
                          <button id="btn_copy" title="Copy Text">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">274 followers</div>
                      <Link to="#" className="btn-main">Follow</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <ul className="de_nav">
                    <li className="active"><span>On Sale</span></li>
                    <li><span>Owned</span></li>
                  </ul>

                  <div className="de_tab_content">
                    <div className="tab-1 onStep fadeIn">
                      <div className="row">
                        <div className="col-12">
                          <p>Author items will go here</p>
                        </div>
                      </div>
                    </div>

                    <div className="tab-2 onStep fadeIn">
                      <div className="row">
                        <div className="col-12">
                          <p>Owned items will go here</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
