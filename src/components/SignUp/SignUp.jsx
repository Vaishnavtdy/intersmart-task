import React, { useState } from "react";

import { images } from "../../constants";
import "./SignUp.scss";
import axios from "axios";
import { baseUrl } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const SignUp = ({ setRegisterMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    contact_no: "",
    passport_no: "",
    qatar_id: "",
    email: "",
    password: "",
  });

  // handle input fields
  const handleInput = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  //handle submit api

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("input", inputs);
    console.log("dob", inputs.dob.split("-").reverse().join("-"));

    axios
      .post(`${baseUrl}/auth/register`, {
        firstname: inputs.firstname,
        lastname: inputs.lastname,
        dob: inputs.dob.split("-").reverse().join("-"),
        contact_no: inputs.contact_no,
        passport_no: inputs.passport_no,
        qatar_id: inputs.qatar_id,
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        console.log("Res-->", res.data);

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
            title: res.data.message,
            icon: "error",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="signup__container">
      <img className="signup-logo" src={images.logo} alt="logo" />

      <h1>Sign Up</h1>
      <h5>Your Account</h5>

      <form className="signup__form" onSubmit={handleSubmit}>
        <div className="form__group">
          <input
            type="text"
            placeholder="First Name"
            name="firstname"
            id="firstname"
            value={inputs.firstname}
            onChange={handleInput}
            required
          />

          <input
            type="text"
            placeholder="Last Name"
            name="lastname"
            id="lastname"
            value={inputs.lastname}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form__group">
          <input
            type="date"
            placeholder="DOB"
            name="dob"
            id="dob"
            value={inputs.dob}
            onChange={handleInput}
            required
          />

          <input
            type="number"
            placeholder="Contact No"
            name="contact_no"
            id="contact_no"
            value={inputs.contact_no}
            onChange={handleInput}
            required
          />
        </div>

        <div className="form__group">
          <input
            type="text"
            placeholder="Passport No"
            name="passport_no"
            id="passport_no"
            value={inputs.passport_no}
            onChange={handleInput}
            required
          />

          <input
            type="text"
            placeholder="Quatar ID"
            name="qatar_id"
            id="qatar_id"
            value={inputs.qatar_id}
            onChange={handleInput}
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          value={inputs.email}
          onChange={handleInput}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          id="password"
          value={inputs.password}
          onChange={handleInput}
          required
        />

        <button type="submit" className="signin__button">
          Sign up
        </button>
      </form>

      <p className="change__options" onClick={() => setRegisterMode(false)}>
        Change to Sign in
      </p>
    </div>
  );
};

export default SignUp;
