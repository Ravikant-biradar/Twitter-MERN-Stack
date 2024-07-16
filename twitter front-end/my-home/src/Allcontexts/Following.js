import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
// import { userinformationcontext } from "./Usercontext";
import { userprofilecontext } from "./Getloggedinuser";

export const tweetswhomifollowcontext = createContext();

const Tweetswhomifollowprovider = ({ children }) => {
  const [tweetswhoomfollow, settweetswhooifollow] = useState(null);
  console.log(tweetswhoomfollow);

  //user profolie i mean logged in user data
  const { userprofile } = useContext(userprofilecontext);

  // const userinformation context
  //   const { userinformationdata } = useContext(userinformationcontext);
  //   console.log(userinformationdata);

  useEffect(() => {
    try {
      if (userprofile) {
        const fetchalltweetswhomifollow = async () => {
          const alltweetsdata = await axios.get(`http://localhost:3000/api/all/tweets/${userprofile._id}`);
          console.log(alltweetsdata.data);
          settweetswhooifollow(alltweetsdata.data);
        };

        fetchalltweetswhomifollow();
      }
    } catch (error) {
      console.log(`error in profile ${error}`);
    }
  }, [userprofile]);

  return (
    <>
      <tweetswhomifollowcontext.Provider value={{ tweetswhoomfollow }}>
        {children}
      </tweetswhomifollowcontext.Provider>
    </>
  );
};

export default Tweetswhomifollowprovider;
