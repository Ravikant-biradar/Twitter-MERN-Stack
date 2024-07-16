import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
// import { userinformationcontext } from "./Usercontext";


export const alltweetscontext = createContext();

const Alltweetsprovider = ({ children }) => {
  const [alltweets, setalltwwets] = useState(null);
  console.log(alltweets);

  // const userinformation context
  //   const { userinformationdata } = useContext(userinformationcontext);
  //   console.log(userinformationdata);

  useEffect(() => {
    try {
      const fetchalltweets = async () => {
        const alltweetsdata = await axios.get(`http://localhost:3000/api/v1/get-all-tweeets/get-all-tweets`);
        console.log(alltweetsdata.data);
        setalltwwets(alltweetsdata.data);
      };

      fetchalltweets();
    } catch (error) {
      console.log(`error in profile ${error}`);
    }
  }, []);

  return (
    <>
      <alltweetscontext.Provider value={{ alltweets }}>
        {children}
      </alltweetscontext.Provider>
    </>
  );
};

export default Alltweetsprovider;
