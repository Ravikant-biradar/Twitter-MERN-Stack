import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { userinformationcontext } from "./Usercontext";

export const allotheruserscontext = createContext();

const AllUserprofileprovider = ({ children }) => {
  const [allotherusers, setallotherusers] = useState(null);
  console.log(allotherusers);

  // const userinformation context
  const { userinformationdata } = useContext(userinformationcontext);

  useEffect(() => {
    const allotherprofiles = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/get-all-profiles/${userinformationdata._id}`
      );
      const data = response.data;
      console.log(data);

      localStorage.setItem("allotherusers", JSON.stringify(data));
    };

    if (userinformationdata) {
      allotherprofiles();
    }
  }, [userinformationdata]);

  // get from local storage
  useEffect(() => {
    const takeall = localStorage.getItem("allotherusers");
    if (takeall) {
      setallotherusers(JSON.parse(takeall));
    }
  }, []);

  return (
    <>
      <allotheruserscontext.Provider value={{ allotherusers }}>
        {children}
      </allotheruserscontext.Provider>
    </>
  );
};

export default AllUserprofileprovider;
