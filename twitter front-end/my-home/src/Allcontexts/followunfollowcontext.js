import React, { createContext, useState, useEffect } from "react";

export const followunfollowcontext = createContext();

const Folowunfolowprovider = ({ children }) => {
  const [folowunfolow, setfolowunfolow] = useState(false);
  console.log(folowunfolow);

  // setitems in local store
  useEffect(() => {
    if (folowunfolow !== null) {
      localStorage.setItem("trueflasevalue", JSON.stringify(folowunfolow));
    }
  }, [folowunfolow]);

  // gettitems from local store
  useEffect(() => {
    const take = localStorage.getItem("trueflasevalue");
    if (take) {
      setfolowunfolow(JSON.parse(take));
    }
  }, []);

  const takefolowunfolowinfo = (take) => {
    setfolowunfolow(take);
  };
  return (
    <>
      <followunfollowcontext.Provider
        value={{ folowunfolow, takefolowunfolowinfo }}
      >
        {children}
      </followunfollowcontext.Provider>
    </>
  );
};

export default Folowunfolowprovider;
