import React, { useState } from "react";

import "./SignIn.scss";
import { baseUrl } from "../../utils/api";
import { images } from "../../constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SignIn = ({ setRegisterMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // function for handling inputs
  const handleInput = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // function for handling api request
  const sendRequest = (e) => {
    e.preventDefault();
    console.log("Inputs", inputs);

    axios
      .post(`${baseUrl}/auth/login`, {
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        console.log("Res=>", res.data);
        if (res.data.code == 200) {
          //set token to local storage
          localStorage.setItem("userId", res.data.data.token);

          //Api is not provided for fetching the user details using userId, because i stored the username also.
          localStorage.setItem("userName", res.data.data.first_name);

          dispatch(login());
          navigate("/");
          swal({
            title: "Success",
            icon: "success",
          });
        }
        else{
          swal({
            title: "Login Failed",
            icon: "error",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signin__container">
      <img className="signin-logo" src={images.logo} alt="logo" />

      <h1>Sign Into</h1>
      <h5>Your Account</h5>

      <form className="signin__form" onSubmit={sendRequest}>
        <div className="form__input">
          <img src={images.briefcase} alt="" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form__input">
          <img src={images.lock} alt="lock-icon" />
          <input
            type="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleInput}
            placeholder="Password"
            required
          />
        </div>

        <div className="form__action-section">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember Me</label>
          </div>
          <span>Forgot Password?</span>
        </div>
        <button type="submit" className="signin__button">
          Sign in
        </button>
      </form>

      <p className="change__options" onClick={() => setRegisterMode(true)}>
        Change to Sign up
      </p>
    </div>
  );
};

export default SignIn;
