import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import { Navbar, Nav, Button } from "react-bootstrap";

import "./Header.css";

const Header = () => {
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
      return (
        <span className="nav-link" onClick={() => signOut()}>
          Logout
        </span>
      );
    } else {
      return (
        <Link to={{ pathname: "/" }}>
          <Button>Login</Button>
        </Link>
      );
    }

    return null;
  };

  return (
    <Navbar sticky="top" id="nav" className="nav">
      <Navbar.Brand>
        <Link to={{ pathname: "/dashboard" }}>LovelyLetters</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse>
        <Nav className="mr-auto">
          <Link className="nav-link" to={{ pathname: "/letters" }}>
            Letters
          </Link>
          <Link className="nav-link" to={{ pathname: "/contacts" }}>
            Contacts
          </Link>
        </Nav>
        {renderAuth()}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
