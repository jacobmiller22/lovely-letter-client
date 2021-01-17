import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import "./Header.css";

const Header = () => {
  const [active, setActive] = useState("");

  const User = useContext(UserContext);

  const renderAuth = () => {
    const signOut = () => {
      window.localStorage.removeItem("jwt");
      User.setCurrUser(null);
      User.setIsLoggedIn(false);
    };

    if (User.currUser) {
      return (
        <div className='menu-item'>
          <Link to='/' className='ui header item button' onClick={signOut}>
            Logout
          </Link>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='menu-container'>
      <div className='ui fluid secondary pointing menu'>
        <div className='menu-item'>
          <Link
            to='/dashboard'
            className={`ui header${active === "dash" ? " active" : ""} item`}
            onClick={() => setActive("dash")}>
            LovelyLetters
          </Link>
        </div>

        <div className='menu-item'>
          <Link
            to='/contacts'
            className={`ui header ${
              active === "contacts" ? "active" : ""
            } item`}
            onClick={() => setActive("contacts")}>
            Contacts
          </Link>
        </div>
        <div className='right menu'>{renderAuth()}</div>
      </div>
    </div>
  );
};

export default Header;
