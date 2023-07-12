import React from "react";

import "./SideBar.scss";
import { navItems } from "../../constants/utils";
import { images } from "../../constants";

function SideBar() {
  return (
    <div className="app__sidebar">
      <img src={images.logo} alt="logo" className="app__logo" />
      <ul className="nav__items">
        {navItems.map((item) => (
          <li key={`link-${item.name}`}>
            <img src={item.img} alt={item.name} className="list__img" /> <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
