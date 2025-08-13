import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/AuthorItems";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { getUserById } from "../data/userData";

const API_URL = "https://us-central1-nft-cloud-functions.cloudfunctions.net/authors";

// ---------- In-file helpers (no separate normalizer file) ----------
function toSlug(s) {
  return (s || "").toString().trim().toLowerCase().replace(/\s+/g, "");
}
function toNumber(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// Normalize an "author-like" object into a consistent shape this page uses.
function normalizeAuthor(raw, fallbackId) {
  if (!raw && !fallbackId) return null;

  const id =
    (raw?.id ??
      raw?.authorId ??
      raw?.author_id ??
      raw?.author ??
      fallbackId ??
      "") + "";

  const name =
    raw?.name ??
    raw?.authorName ??
    raw?.author_name ??
    raw?.title ??
    "Unknown";

  const avatar =
    raw?.avatar ??
    raw?.authorImage ??
    raw?.author_image ??
    raw?.image ??
    raw?.img ??
    "";

  const username =
    raw?.username ||
    (name ? toSlug(name) : "");

  const walletAddress =
    raw?.walletAddress ??
    raw?.wallet_address ??
    raw?.wallet ??
    raw?.address ??
    "";

  const followerCountRaw =
    raw?.followerCount ??
    raw?.followersCount ??
    raw?.followers_count ??
    raw?.followers ??
    0;

  const followerCount = toNumber(followerCountRaw);
  const bio = raw?.bio ?? raw?.description ?? "";

  return { id, name, username, avatar, walletAddress, followerCount, bio };
}

// Try to get an author object from various possible shapes in location.state
function extractAuthorFromState(state, fallbackId) {
  if (!state) return null;

  // Explicit author passed
  if (state.author && typeof state.author === "object") {
    return normalizeAuthor(state.author, fallbackId);
  }

  // If a collection or item was passed, try to synthesize from nested/flat fields
  const source = state.collection || state.item || null;
  if (source) {
    // Prefer nested author object if present
    if (source.author && typeof source.author === "object") {
      const nested = normalizeAuthor(source.author, fallbackId);
      if (nested?.id) return nested;
    }

    // Otherwise, try to build from common top-level keys used in collections/items
    return normalizeAuthor(
      {
        id: source.authorId ?? source.author_id ?? source.creatorId ?? source.creator_id,
        name: source.authorName ?? source.author_name ?? source.creatorName ?? source.creator_name,
        avatar:
          source.authorImage ??
          source.author_image ??
          source.creatorImage ??
          source.creator_image ??
          source.profileImage,
        username: source.username,
        walletAddress:
          source.walletAddress ??
          source.wallet_address ??
          source.wallet ??
          source.address,
        followers:
          source.followers ?? source.followersCount ?? source.followerCount,
        bio: source.bio ?? source.description,
      },
      fallbackId
    );
  }

  // Legacy: some code might pass { collection: <author-like> }
  if (
    state.collection &&
    typeof state.collection === "object" &&
    !state.collection.author &&
    (state.collection.authorName || state.collection.authorImage)
  ) {
    return normalizeAuthor(state.collection, fallbackId);
  }

  return null;
}
// -------------------------------------------------------------------

const Author = () => {
  const location = useLocation();
  const { id } = useParams(); // route id for author

  const [copied, setCopied] = useState(false);

  // Fetching state
  const [authorFromApi, setAuthorFromApi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Follow state (client-side, persisted per author)
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  // Author coming from Explorer/HotCollections/etc
  const authorFromState = useMemo(() => {
    return extractAuthorFromState(location.state, id);
  }, [location.state, id]);

  // Local mapping (if any)
  const localUser = useMemo(() => {
    const u = getUserById?.(id);
    return u ? normalizeAuthor(u, id) : null;
  }, [id]);

  const authorFromStateMatchesRoute = useMemo(() => {
    if (!authorFromState?.id) return false;
    return String(authorFromState.id) === String(id);
  }, [authorFromState, id]);

  // Fetch the author if we don't already have matching state/local data
  useEffect(() => {
    let isMounted = true;

    const fetchAuthor = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}?author=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error(`Failed to fetch author (${res.status})`);
        const data = await res.json();
        if (!isMounted) return;

        const normalized = normalizeAuthor(data, id);
        setAuthorFromApi(normalized);
      } catch (e) {
        console.error(e);
        if (isMounted) setError("Unable to fetch author data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (!authorFromStateMatchesRoute && !localUser) {
      fetchAuthor();
    } else {
      setLoading(false);
    }

    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [id, authorFromStateMatchesRoute, localUser]);

  // Choose the final author to display
  const displayUser = useMemo(() => {
    if (authorFromStateMatchesRoute && authorFromState) return authorFromState;
    if (localUser) return localUser;
    if (authorFromApi) return authorFromApi;
    if (authorFromState) return normalizeAuthor(authorFromState, id);
    return null;
  }, [authorFromApi, authorFromState, authorFromStateMatchesRoute, localUser, id]);

  // Initialize follow state and followerCount when author resolves
  useEffect(() => {
    if (!displayUser?.id) return;
    const key = `follow:${displayUser.id}`;
    let stored = false;
    try {
      stored = localStorage.getItem(key) === "1";
    } catch (_) {
      // ignore storage errors
    }
    setIsFollowing(stored);

    const base = toNumber(displayUser?.followerCount);
    setFollowerCount(base + (stored ? 1 : 0));
  }, [displayUser?.id, displayUser?.followerCount]);

  const copyWalletAddress = () => {
    if (displayUser?.walletAddress) {
      navigator.clipboard.writeText(displayUser.walletAddress).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  const handleFollowToggle = () => {
    if (!displayUser?.id) return;

    setIsFollowing((prev) => {
      const next = !prev;
      setFollowerCount((curr) => Math.max(0, curr + (next ? 1 : -1)));
      try {
        localStorage.setItem(`follow:${displayUser.id}`, next ? "1" : "0");
      } catch (_) {
        // ignore storage errors
      }
      return next;
    });
  };

  if (loading) {
    return (
      <>
        <Nav />
        <div className="container my-5 text-center">
          <h4>Loading author data...</h4>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !displayUser?.id) {
    return (
      <>
        <Nav />
        <div className="container my-5 text-center">
          <h2>Author Not Found</h2>
          <p>{error || "No author data available."}</p>
          <Link to="/" className="btn btn-primary">Go Home</Link>
        </div>
        <Footer />
      </>
    );
  }

  const username = `@${displayUser.username || toSlug(displayUser.name)}`;

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
                            {displayUser.walletAddress || "—"}
                          </span>
                          <button
                            id="btn_copy"
                            title="Copy wallet address"
                            onClick={copyWalletAddress}
                            style={{
                              backgroundColor: copied ? '#28a745' : '',
                              color: copied ? 'white' : ''
                            }}
                            disabled={!displayUser.walletAddress}
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
                        {toNumber(followerCount).toLocaleString()} followers
                      </div>
                      <button
                        type="button"
                        className="btn-main"
                        onClick={handleFollowToggle}
                        aria-pressed={isFollowing}
                        aria-label={isFollowing ? "Unfollow" : "Follow"}
                      >
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Items tab, pass consistent author data */}
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    authorData={{
                      id: displayUser.id,
                      authorName: displayUser.name,
                      authorImage: displayUser.avatar,
                      walletAddress: displayUser.walletAddress,
                      followerCount: followerCount, // live count
                      username: displayUser.username,
                      bio: displayUser.bio
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


