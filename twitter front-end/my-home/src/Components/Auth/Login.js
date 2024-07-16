import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { userinformationcontext } from "../../Allcontexts/Usercontext";

function Login() {
  // userinformation context
  const { takeuserinformation } = useContext(userinformationcontext);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // register - Click
  const registerClick = async (e) => {
    e.preventDefault();

    try {
      const userregister = await axios.post(
        `http://localhost:3000/api/auth/user-login`,
        {
          email,
          password,
        }
      );

      console.log(userregister.data.userinfo);
      // context function to get the data
      takeuserinformation(userregister.data.userinfo);
      toast.success(`Wel-come Back ${userregister.data.mes} `);
      navigate("/home")
    } catch (error) {
      console.log(`error while frontend login ${error}`);
    }
  };
  return (
    <>
      <div className="reg-section">
        <img
          className="x-img"
          src="https://i.pinimg.com/474x/f6/68/90/f66890653a1275aa5b742387233f4243.jpg"
          alt=""
        />

        <form className="reg-form" onSubmit={registerClick}>
          <h1
            style={{
              fontFamily: "sans-serif",
              fontWeight: "800",
              fontSize: "6vh",
              margin: "0",
            }}
          >
            Happening Now
          </h1>
          <h1
            style={{
              fontFamily: "sans-serif",
              fontWeight: "800",
              fontSize: "6vh",
            }}
          ></h1>
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email"
            className="reg-input"
            type="email"
          />
          {/*  */}

          <input
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            placeholder="password"
            className="reg-input"
            type="password"
          />
          <div className="reg-btn-div">
            <Button type="submit" className="reg-btn" variant="success">
              Login ..
            </Button>
            <Button
              onClick={() => {
                navigate("/");
              }}
              className="login-btn"
              variant="danger"
            >
              Register ..
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
