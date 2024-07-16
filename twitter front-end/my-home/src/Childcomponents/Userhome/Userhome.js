import React, { useContext, useState , useEffect} from "react";
import "./Userhome.css";
import { userprofilecontext } from "../../Allcontexts/Getloggedinuser";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import CommentBankOutlinedIcon from "@mui/icons-material/CommentBankOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import { alltweetscontext } from "../../Allcontexts/Alltweets";
import DeleteIcon from "@mui/icons-material/Delete";
import timeAgo from "../../Time";

import axios from "axios";
import { toast } from "react-hot-toast";
//

import { NavLink } from "react-router-dom";
import Other from "../../Other";
import { pink } from "@mui/material/colors";

function Userhome() {

  const [tweetbelongtologeduser , settweetbelongtologeduser] = useState(null)
  // console.log(tweetbelongtologeduser.createdby);


  // userprofile context
  const { userprofile } = useContext(userprofilecontext);
  // console.log(userprofile.allmytweets);
  // tweetsbelongs to logedinuser

  useEffect(() => {
 if (userprofile) {
  const fetch = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/logedinuser-tweets/get-all-tweets-of-logedin-user/${userprofile._id}`
    );
    console.log(response.data);
settweetbelongtologeduser(response.data)
  };
  fetch()
 }
  }, [userprofile]);

  // usestate
  const [createdtweet, setcreatedtweet] = useState("");

  const createtweetfunction = async (e) => {
    e.preventDefault();
    if (createdtweet == "") {
      return toast.loading("plz write something", { duration: 5000 });
    }
    const sendtweet = await axios.post(
      `http://localhost:3000/api/posttweet/createtweet`,
      {
        createdby: userprofile._id,
        posttweet: createdtweet,
      }
    );
    console.log(sendtweet.data);
  };

  // deletemytweetfunction

  const deletemytweetfunction = async (tweetid) => {
    console.log(tweetid);
    if (tweetid) {
      const deletetweet = await axios.delete(
        `http://localhost:3000/api/deletetweet/deletetweet/${tweetid}`
      );
      // window.location.reload();
    }
  };

  return (
    <>
      <Other />
      <hr style={{ margin: "0" }} />
      <section className="userhome-main-section">
        <div className="profile-plus-tweet-div">
          <div className="profile-div">
            <img src={userprofile?.profile} alt="" />
          </div>
          <input
            onChange={(e) => {
              setcreatedtweet(e.target.value);
            }}
            className="tweet-input"
            placeholder="whats happening now 🤷‍♂️🫠"
            type="text"
          />
        </div>
        <div className="icon-plus-post-div">
          <span>
            <CollectionsOutlinedIcon />
          </span>
          <button onClick={createtweetfunction} className="post-tweet-btn">
            Post
          </button>
        </div>
        <hr style={{ margin: "0" }} />
      </section>

      {/*  all tweets belongs to user?login */}
      <section className="all-logedin-user-main-sec">
        {tweetbelongtologeduser?.map((logdinusertweets, i) => (
          <div key={i} className="mapped-tweets-main-div">
            <div className="profile-plus-all-otherinfo">
              <div className="img-divs">
                <img src={logdinusertweets?.createdby?.profile} alt="" />
              </div>
              <div className="other-divs">
                <div className="name-usernme-time-main-div">
                  <h4>{logdinusertweets?.createdby?.name}✅</h4>
                  <h5>@{logdinusertweets?.createdby?.username}</h5>
                  <h6>{timeAgo(logdinusertweets?.createdAt)}</h6>
                </div>
                <h6 className="this-is-tweet">{logdinusertweets?.posttweet}</h6>
                {/* <h6><DeleteIcon/></h6> */}
              </div>
            </div>
            <div
              // style={{ position: "relative", left: "150px" }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // border: "0.1px solid black",
                justifyContent: "space-evenly",
              }}
              className="all-three-icons"
            >
              <h6
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0.1px solid #817f7f92",
                  height: "30px",
                  padding: "8px",
                  borderRadius: "8px",
                  marginTop: "10px",
                }}
              >
                edit tweet
              </h6>
              <h1
                // style={{ border: "1px solid black" }}
                onClick={() =>
                  deletemytweetfunction(logdinusertweets.createdby._id)
                }
              >
                <DeleteIcon sx={{ color: pink[500] }} />
              </h1>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Userhome;

{
  /* <div className="all-three-icons">
<h1>
  <CommentBankOutlinedIcon />
</h1>
<h1>
  <span className="like-dislike-span">
    
  </span>
  <span
    style={{ marginRight: "5px" }}
  
  >
    <ThumbUpOutlinedIcon />
  </span>
</h1>
<h1>
  <BookmarkAddOutlinedIcon />
</h1>
</div> */
}
