import React, { useContext } from "react";
import { tweetswhomifollowcontext } from "../../Allcontexts/Following";
import timeAgo from "../../Time";
import CommentBankOutlinedIcon from "@mui/icons-material/CommentBankOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import "./Following.css";
import axios from "axios";
import { userprofilecontext } from "../../Allcontexts/Getloggedinuser";

function Following() {
  const { userprofile } = useContext(userprofilecontext);

  const { tweetswhoomfollow } = useContext(tweetswhomifollowcontext);
  if (!tweetswhoomfollow) {
    return <div>You dont follow anyone do follow to see tweets...</div>;
  }

  const likedislikefunction = async (idcomeshere, e) => {
    e.preventDefault();
    if (userprofile._id && idcomeshere) {
      const likediskike = await axios.put(
        `http://localhost:3000/api/tweet-likes/like-&-dislike/${idcomeshere}`,
        {
          logged_in_user_id: userprofile._id,
        }
      );
    }
    window.location.reload();
  };

  return (
    <>
      {/*  all tweets are here  */}
      <section className="all-tweets-of-whom-i-follow-main-sec">
        {tweetswhoomfollow?.tweets.map((alltweet, i) => (
          <div key={i} className="mapped-tweets-in-whom-i follow-main-div">
            <div className="profile-plus-all-otherinfo">
              <div className="img-divs">
                <img src={alltweet?.createdby?.profile} alt="" />
              </div>
              <div className="other-divs">
                <div className="name-usernme-time-main-div">
                  <h4>{alltweet?.createdby?.name}✅</h4>
                  <h5>@{alltweet?.createdby?.username}</h5>
                  <h6>{timeAgo(alltweet?.createdby?.createdAt)}</h6>
                </div>
                <h6 className="this-is-tweet">{alltweet?.posttweet}</h6>
              </div>
            </div>
            <div className="all-three-icons">
              <h1>
                <CommentBankOutlinedIcon />
              </h1>
              <h1>
                <span className="like-dislike-span">
                  {alltweet?.like?.length}
                </span>
                <span
                  onClick={(e) => likedislikefunction(alltweet._id, e)}
                  style={{ border: "1px solid black" }}
                >
                  <ThumbUpOutlinedIcon />
                </span>
              </h1>
              <h1>
                <BookmarkAddOutlinedIcon />
              </h1>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Following;
