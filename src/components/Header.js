import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { Dropdown } from "semantic-ui-react";

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
        <div className='item'>
          <Link to='/' className='ui header item' onClick={signOut}>
            Logout
          </Link>
        </div>
        // <Dropdown
        //   className='header item drop-down'
        //   item
        //   text='Profile'
        //   open={open}
        //   lazyLoad
        //   onClick={() => {
        //     console.log("Opening");
        //     setOpen(!open);
        //   }}>
        //   <Dropdown.Menu>
        //     {menuItems.map((item) => (
        //       <Dropdown.Item key={item.value} {...item} />
        //     ))}
        //     {/* <Dropdown.Item>blah</Dropdown.Item>
        //     <Dropdown.Item>blah</Dropdown.Item>
        //     <Dropdown.Item>
        //       <Link to='/' onClick={signOut}>
        //         Logout
        //       </Link>
        //     </Dropdown.Item> */}
        //   </Dropdown.Menu>
        // </Dropdown>
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
