import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

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
        <Link to='/' className='ui button' onClick={signOut}>
          Logout
        </Link>
      );
    }
    return null;
  };

  return (
    <div className='ui fluid secondary pointing menu'>
      <Link
        to='/dashboard'
        className={`header ${active === "dash" ? "active" : ""} item`}
        onClick={() => setActive("dash")}>
        LovelyLetters
      </Link>

      <Link
        to='/contacts'
        className={`header ${active === "contacts" ? "active" : ""} item`}
        onClick={() => setActive("contacts")}>
        Contacts
      </Link>
      <div className='right menu'>{renderAuth()}</div>
    </div>
  );
};

export default Header;
