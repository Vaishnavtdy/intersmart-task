import React, { useState } from "react";
import { SignIn, SignUp } from "../../components";

import { images } from "../../constants";
import "./Login.scss";

const Login = () => {
  const [registerMode, setRegisterMode] = useState(false);

  return (
    <div className="login__container">
      <div className="login__left-section">
        {registerMode ? (
          <SignUp setRegisterMode={setRegisterMode} />
        ) : (
          <SignIn setRegisterMode={setRegisterMode} />
        )}
      </div>

      <div className="login__right-section">
        <img src={images.LoginBanner} alt="" />
      </div>
    </div>
  );
};

export default Login;
