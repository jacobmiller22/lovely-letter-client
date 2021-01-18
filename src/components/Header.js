import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { Dropdown } from "semantic-ui-react";

import "./Header.css";

const Header = () => {
  const [active, setActive] = useState("");

  const User = useContext(UserContext);
  let history = useHistory();

  const renderAuth = () => {
    const signOut = () => {
      window.localStorage.removeItem("jwt");
      User.setCurrUser(null);
      User.setIsLoggedIn(false);
      history.push("/");
    };

    if (User.currUser) {
      const options = [
        { key: "profile", text: "Profile", icon: "user", value: "/profile" },
        {
          key: "settings",
          text: "Settings",
          icon: "settings",
          value: "/settings",
        },
        {
          key: "logout",
          text: "Logout",
          icon: "sign out",
          value: "/",
        },
      ];

      const navigate = (e, { value }) => {
        switch (value) {
          case "/":
            signOut();
            break;
          case "/profile":
            history.push("/profile");
            break;
          default:
            return;
        }
      };

      const trigger = (
        <div className='item'>
          <div className='ui header item'>Profile</div>
        </div>
      );

      return (
        <Dropdown
          options={options}
          trigger={trigger}
          icon={null}
          onChange={navigate}
        />
      );
    }
    return null;
  };

  return (
    <div className='menu-container'>
      <div className='ui fluid secondary pointing menu'>
        <div className='item'>
          <Link
            to='/dashboard'
            className={`ui header${active === "dash" ? " active" : ""} item`}
            onClick={() => setActive("dash")}>
            LovelyLetters
          </Link>
        </div>

        <div className='item'>
          <Link
            to='/contacts'
            className={`ui header ${
              active === "contacts" ? "active" : ""
            } item`}
            onClick={() => setActive("contacts")}>
            Contacts
          </Link>
        </div>
        <div className='right menu'>
          <i className='ui very large icons menu-item'>
            <i className='bell icon'></i>
            <div className='floating ui tiny red circular label'>1</div>
          </i>
          <div className='menu-item'></div>
          {renderAuth()}
        </div>
      </div>
    </div>
  );
};

export default Header;
