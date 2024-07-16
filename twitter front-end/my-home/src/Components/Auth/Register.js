import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "./Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



function Register() {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // registerClick
  const registerClick = async (e) => {
    e.preventDefault();
    try {
      const userregister = await axios.post(
        `http://localhost:3000/api/auth/user-register`,
        {
          name,
          username,
          email,
          password,
        }
      );
      navigate("/user-login");
      console.log(userregister.data.data);
      toast.success(`${userregister.data.mes} Registered Succefully`)
    } catch (error) {
      console.log(`erroe whilie frontend register ${error}`);
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
          <input
            onChange={(e) => {
              setname(e.target.value);
            }}
            placeholder="name"
            className="reg-input"
            type="text"
          />
          <input
            onChange={(e) => {
              setusername(e.target.value);
            }}
            placeholder="username"
            className="reg-input"
            type="text"
          />
          <input
            onChange={(e) => {
              setemail(e.target.value);
            }}
            placeholder="email"
            className="reg-input"
            type="email"
          />
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
              Register ..
            </Button>
            <Button
              onClick={() => {
                navigate("/user-login");
              }}
              className="login-btn"
              variant="danger"
            >
              Login ..
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
