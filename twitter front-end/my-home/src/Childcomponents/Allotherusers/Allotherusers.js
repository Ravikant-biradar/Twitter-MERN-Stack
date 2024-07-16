import { React, useContext, useState } from "react";
import { allotheruserscontext } from "../../Allcontexts/Getallotheruser";
import { Await, NavLink } from "react-router-dom";
import { manageseperatestatecontext } from "../../Allcontexts/Manageseparatestate";
//
import timeAgo from "../../Time";
import CommentBankOutlinedIcon from "@mui/icons-material/CommentBankOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import "./Allotherusers.css";
import axios from "axios";
import { userprofilecontext } from "../../Allcontexts/Getloggedinuser";
import { followunfollowcontext } from "../../Allcontexts/followunfollowcontext";

function Allotherusers() {
  // user profilr or logged in user
  const { userprofile } = useContext(userprofilecontext);
  // seperate context
  const { seperatestate } = useContext(manageseperatestatecontext);
  //folowunfolow context
  const { takefolowunfolowinfo } = useContext(followunfollowcontext);
  const { folowunfolow } = useContext(followunfollowcontext);
  // followunfollowfunction
  const followunfollowfunction = async (e) => {
    e.preventDefault();
    const make = await axios.put(
      `http://localhost:3000/api/follow-api/following/${userprofile._id}`,
      {
        id: seperatestate._id,
      }
    );
    console.log(make.data.isfollowing);
    takefolowunfolowinfo(make.data.isfollowing);
  };

  // like and dislike function......
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
      <section className="profile-main-sec">
        <div>
          <img
            className="bg-profile-template"
            src="https://i.pinimg.com/474x/f2/2d/2a/f22d2afa19665d3dcf1d1480f1f527c2.jpg"
            alt=""
          />
          <div className="profile-edit-div">
            <div className="profile-pic-div">
              <img
                className="profile-pic"
                src={seperatestate?.profile}
                alt=""
              />
            </div>
            <h1
              onClick={followunfollowfunction}
              style={{
                backgroundColor: folowunfolow ? "black" : "#0095F6",
                color: "white",
              }}
            >
              {folowunfolow ? "following" : "follow"}
            </h1>
          </div>

          <div className="user-bio-main-div">
            <h1>{seperatestate?.name}</h1>
            <h1>{seperatestate?.username}</h1>
          </div>
          <hr className="hrline" />
        </div>
      </section>

      <section>
        {seperatestate?.allmytweets?.map((alltweet, i) => (
          <div key={i} className="mapped-tweets-below-there">
            <div className="profile-plus-all-otherinfo">
              <div className="img-divs">
                <img src={seperatestate.profile} alt="" />
              </div>
              <div className="other-divs">
                <div className="name-usernme-time-main-div">
                  <h4>{seperatestate?.name}✅</h4>
                  <h5>@{seperatestate?.username}</h5>
                  <h6>{timeAgo(alltweet?.createdAt)}</h6>
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
                  onClick={(e) => likedislikefunction(alltweet._id, e)}
                  // style={{ border: "1px solid black" }}
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

export default Allotherusers;

// all other users context
//   const { allotherusers } = useContext(allotheruserscontext);
