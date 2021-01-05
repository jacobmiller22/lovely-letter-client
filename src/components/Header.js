import React from "react";
import { Link } from "react-router-dom";

const Header = ({ currUser, setCurrUser, setIsLoggedIn }) => {
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
    <div className='ui secondary pointing menu'>
      <Link to='/' className='item'>
        LovelyLetters
      </Link>
      <div className='right menu'>{renderAuth()}</div>
    </div>
  );
};

export default Header;
