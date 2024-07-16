import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { userinformationcontext } from "./Usercontext";

export const userprofilecontext = createContext();

const Userprofileprovider = ({ children }) => {
  const [userprofile, setuserprofile] = useState(null);
  console.log(userprofile);

  // const userinformation context
  const { userinformationdata } = useContext(userinformationcontext);
  //   console.log(userinformationdata);

  useEffect(() => {
    if (userinformationdata) {
      try {
        const fetchuserprofile = async () => {
          const userprofiledata = await axios.get(
            `http://localhost:3000/api/get-profile/profile/${userinformationdata._id}`
          );
          console.log(userprofiledata.data);
          setuserprofile(userprofiledata.data);
        };

        fetchuserprofile();
      } catch (error) {
        console.log(`error in profile ${error}`);
      }
    }
  }, [userinformationdata]);

  return (
    <>
      <userprofilecontext.Provider value={{ userprofile }}>
        {children}
      </userprofilecontext.Provider>
    </>
  );
};

export default Userprofileprovider;
