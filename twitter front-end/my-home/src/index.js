import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Userinformationprovider from "./Allcontexts/Usercontext";
import Userprofileprovider from "./Allcontexts/Getloggedinuser";
import AllUserprofileprovider from "./Allcontexts/Getallotheruser";
import Takeseperatestateprovider from "./Allcontexts/Manageseparatestate";
import Alltweetsprovider from "./Allcontexts/Alltweets";
import Folowunfolowprovider from "./Allcontexts/followunfollowcontext";
import Tweetswhomifollowprovider from "./Allcontexts/Following";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Userinformationprovider>
      <Userprofileprovider>
        <AllUserprofileprovider>
          <Takeseperatestateprovider>
            <Alltweetsprovider>
              <Folowunfolowprovider>
                <Tweetswhomifollowprovider>
                  <App />
                </Tweetswhomifollowprovider>
              </Folowunfolowprovider>
            </Alltweetsprovider>
          </Takeseperatestateprovider>
        </AllUserprofileprovider>
      </Userprofileprovider>
    </Userinformationprovider>
  </React.StrictMode>
);
