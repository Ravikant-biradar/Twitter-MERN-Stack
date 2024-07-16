import React, { useContext, useState } from "react";

import { userprofilecontext } from "../../Allcontexts/Getloggedinuser";
import "./Profile.css";
function Profile() {
  // userprofile context
  const { userprofile } = useContext(userprofilecontext);
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
              <img className="profile-pic" src={userprofile?.profile} alt="" />
            </div>
            <h1>Edit profile</h1>
          </div>

          <div className="user-bio-main-div">
            <h1>{userprofile?.name}</h1>
            <h1>{userprofile?.username}</h1>
          </div>
          <hr className="hrline" />
        </div>
      </section>
    </>
  );
}

export default Profile;
