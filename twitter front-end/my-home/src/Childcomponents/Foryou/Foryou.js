import { React, useContext } from "react";
import timeAgo from "../../Time";
import CommentBankOutlinedIcon from "@mui/icons-material/CommentBankOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { alltweetscontext } from "../../Allcontexts/Alltweets";
import { userprofilecontext } from "../../Allcontexts/Getloggedinuser";
import axios from "axios";

function Foryou() {
  // alltweets are here the context
  const { alltweets } = useContext(alltweetscontext);

  // userprofile or logged in user
  const { userprofile } = useContext(userprofilecontext);
  // console.log(userprofile._id);

  // likedislikefunction

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
      <section className="all-tweets-main-sec">
        {alltweets?.map((alltweet, i) => (
          <div key={i} className="mapped-tweets-main-div">
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
                <h6 className="this-is-tweet">{alltweet.posttweet}</h6>
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
                  style={{ marginRight: "5px" }}
                  // style={{ border: "1px solid black" }}
                  // typeof="submit"
                  onClick={(e) => likedislikefunction(alltweet._id, e)}
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

export default Foryou;
