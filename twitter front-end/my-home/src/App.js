import "./App.css";
// import Button from "react-bootstrap/Button";
import Register from "./Components/Auth/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Auth/Login";
import { Toaster } from "react-hot-toast";
import Home from "./Home";
import Userhome from "./Childcomponents/Userhome/Userhome";
import Profile from "./Childcomponents/Profile/Profile";
import Bookmark from "./Childcomponents/Bookmark/Bookmark";
import Allotherusers from "./Childcomponents/Allotherusers/Allotherusers";
import Foryou from "./Childcomponents/Foryou/Foryou";
import Following from "./Childcomponents/Following/Following";

// or less ideally
// import  Button  from "react-bootstrap";

function App() {
  const routes = createBrowserRouter([
    { path: "/", Component: Register },
    { path: "/user-login", Component: Login },
    // home like dashboard and child compomnents of recat orurter dom
    {
      path: "/home",
      Component: Home,
      children: [
        {
          path: "/home/userhome",
          Component: Userhome,
        },
        { path: "/home/profile", Component: Profile },
        { path: "/home/bookmark", Component: Bookmark },
        { path: "/home/user/:id", Component: Allotherusers },
        {path : "/home/for-you" , Component : Foryou},
        {path : "/home/following-you" , Component : Following}
      ],
    },
    // home like dashboard and child compomnents ends here
  ]);
  return (
    <div className="App">
      <RouterProvider router={routes} />
      <Toaster />
    </div>
  );
}

export default App;
