import React, { useContext } from "react";
import "./Home.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import TagIcon from "@mui/icons-material/Tag";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import BookmarksOutlinedIcon from "@mui/icons-material/BookmarksOutlined";
import { NavLink, Outlet } from "react-router-dom";
import { allotheruserscontext } from "./Allcontexts/Getallotheruser";
import { manageseperatestatecontext } from "./Allcontexts/Manageseparatestate";
import { followunfollowcontext } from "./Allcontexts/followunfollowcontext";

function Home() {
  // folowunfolow context
  const { folowunfolow } = useContext(followunfollowcontext);
  // all other users context
  const { allotherusers } = useContext(allotheruserscontext);
  // manageseperatestatecontext
  const { takeseperatemanagestate } = useContext(manageseperatestatecontext);
  return (
    <>
      <section className="home-main-section">
        {/* left section */}
        <section className="Left-section">
          <NavLink style={{ textDecoration: "none" }} to="userhome">
            <div>
              <span style={{ margin: "15px" }}>
                <HomeOutlinedIcon sx={{ fontSize: 40 }} />
              </span>
              Home
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <div>
              <span style={{ margin: "15px" }}>
                <TagIcon sx={{ fontSize: 40 }} />
              </span>
              Explore
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }}>
            <div>
              <span style={{ margin: "15px" }}>
                <NotificationAddIcon sx={{ fontSize: 40 }} />
              </span>
              Notification
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="profile">
            <div>
              <span style={{ margin: "15px" }}>
                <PeopleAltOutlinedIcon sx={{ fontSize: 40 }} />
              </span>
              Profile
            </div>
          </NavLink>
          <NavLink style={{ textDecoration: "none" }} to="bookmark">
            {" "}
            <div>
              <span style={{ margin: "15px" }}>
                <BookmarksOutlinedIcon sx={{ fontSize: 40 }} />
              </span>
              Bookamrks
            </div>
          </NavLink>

          <NavLink style={{ textDecoration: "none" }}>
            <div>
              <span style={{ margin: "15px" }}>
                <LogoutIcon sx={{ fontSize: 40 }} />
              </span>
              Logout
            </div>
          </NavLink>
        </section>
        {/*  middle section */}
        <section className="middle-section">
          {/* <div>for you</div>
          <div>following you</div> */}
          <div className="middle-sec-foryoudiv-main">
            <NavLink
              style={{
                height: "100%",
                width: "20vw",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "black",
                marginTop: "10px",
              }}
              to="for-you"
            >
              <h1>for you</h1>
            </NavLink>
            <NavLink
              style={{
                height: "100%",
                width: "20vw",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "black",
                marginTop: "10px",
              }}
              to="following-you"
            >
              <h1>following</h1>
            </NavLink>
          </div>

          {/* <div>for you</div>
          <div>following you</div> */}

          <hr className="hrline" />
          <Outlet />
        </section>
        {/* right section */}
        <section className="right-section">
          <div className="right-section-main-div">
            {allotherusers?.map((otherusers, i) => (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                key={i}
                to={`user/${otherusers._id}`}
              >
                <div
                  onClick={() => takeseperatemanagestate(otherusers)}
                  className="rightsec-mapped-data"
                  key={i}
                >
                  <div className="maped-profile-pic-div">
                    <img src={otherusers.profile} alt="" />
                  </div>
                  <div className="name-plus-username-div">
                    <h6>{otherusers.name}</h6>
                    <h6>{otherusers.username}</h6>
                  </div>
                  {/* {folowunfolow ? (
                    <button className="maped-follow-btn">following</button>
                  ) : (
                    <button className="maped-follow-btn">following</button>
                  )} */}
                </div>
              </NavLink>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

export default Home;

// http://localhost:3000/api/v1/get-all-profiles/
