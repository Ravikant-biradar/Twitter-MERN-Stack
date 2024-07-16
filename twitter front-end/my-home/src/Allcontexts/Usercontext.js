import React, { createContext, useState , useEffect } from "react";

export const userinformationcontext = createContext();

const Userinformationprovider = ({ children }) => {
  const [userinformationdata, setuserinformationdata] = useState(null);
  // console.log(userinformationdata);

  //   set-in local staorage
  useEffect(() => {
    if (userinformationdata !== null) {
      localStorage.setItem(
        "Userinformation",
        JSON.stringify(userinformationdata)
      );
    }
  }, [userinformationdata]);

  //   get from local storage
  useEffect(() => {
    const takeuserinformation = localStorage.getItem("Userinformation");
    if (takeuserinformation) {
      setuserinformationdata(JSON.parse(takeuserinformation))
    }
  }, []);

  const takeuserinformation = (take) => {
    setuserinformationdata(take);
  };
  return (
    <>
      <userinformationcontext.Provider
        value={{ userinformationdata, takeuserinformation }}
      >
        {children}
      </userinformationcontext.Provider>
    </>
  );
};

export default Userinformationprovider;
