import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { images } from "../../constants";

import "./Home.scss";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isToggle, setIsToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log("State", isLoggedIn);
  return (
    <div className="home__container">
      <SideBar />
      <div className="home__content">
        <div className="top__bar">
          <h5></h5>
          <div className="dropdown__group">
            <div
              className="dropdown__box"
              onClick={() => setIsToggle(!isToggle)}
            >
              <img src={images.user_icon} alt="profile" />
              <span>{isLoggedIn ? "Super admin" : "Please Login"}</span>
              <img src={images.arrowdown} alt="arrow down" />
            </div>

            {isToggle && (
              <div className="dropdown-expanded">
                {isLoggedIn ? (
                  <span onClick={() => [dispatch(logout()), setIsToggle(false)]}>Logout</span>
                ) : (
                  <span onClick={() => [navigate("/login"), setIsToggle(false)]}>Log in</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
