import React, { createContext, useState, useEffect } from "react";

export const manageseperatestatecontext = createContext();

const Takeseperatestateprovider = ({ children }) => {
  const [seperatestate, setseperatestate] = useState(null);
  console.log(seperatestate);

  //   set-in local staorage
  useEffect(() => {
    if (seperatestate !== null) {
      localStorage.setItem("seperatestate", JSON.stringify(seperatestate));
    }
  }, [seperatestate]);

  //   get from local storage
  useEffect(() => {
    const takeseperatestate = localStorage.getItem("Userinformation");
    if (takeseperatestate) {
      setseperatestate(JSON.parse(takeseperatestate));
    }
  }, []);

  const takeseperatemanagestate = (take) => {
    setseperatestate(take);
  };
  return (
    <>
      <manageseperatestatecontext.Provider
        value={{ seperatestate, takeseperatemanagestate }}
      >
        {children}
      </manageseperatestatecontext.Provider>
    </>
  );
};

export default Takeseperatestateprovider;
