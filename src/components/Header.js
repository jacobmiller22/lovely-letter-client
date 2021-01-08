import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ currUser, setCurrUser, setIsLoggedIn }) => {
  const [active, setActive] = useState("");

  const renderAuth = () => {
    const signOut = () => {
      window.localStorage.removeItem("jwt");
      setCurrUser(null);
      setIsLoggedIn(false);
    };

    if (currUser) {
      return (
        <button className='ui button' onClick={signOut}>
          Logout
        </button>
      );
    }
    return null;
  };

  return (
    <div className='ui fluid secondary pointing menu'>
      <Link
        to='/'
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
