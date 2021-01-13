import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import Login from "./auth/Login";

import user from "../apis/user";

import { initLoginCreds } from "../constants";
import { decodeJWT } from "../utils";

import "./LandingLogin.css";

const LandingLogin = () => {
  const [showError, setShowError] = useState(null);

  const User = useContext(UserContext);

  let history = useHistory();

  const login = (e, vals) => {
    console.log(vals);
    if (e) e.preventDefault();

    (async () => {
      if (vals !== initLoginCreds) {
        const res = await user.get("/auth", { params: { user: vals } });

        if (res.status === 200) {
          const { token } = res.data;
          window.localStorage.setItem("jwt", token);
          const { user } = decodeJWT(token);
          User.setCurrUser(user);
          history.push("/dashboard");
        } else {
          console.error(res.status);
        }
      }
    })();
  };

  const renderContent = () => {
    if (showError) {
      return <div>THERE HAS BEEN AN ERROR</div>;
    }
    return (
      <>
        <span className='left-side-content'>
          <h1 className='title ui header'>Lovely Letters</h1>
        </span>
        <span className='right-side-content'>
          <div className='devise'>
            <h1 className='ui centered header'>Welcome back.</h1>
            <div className='register-remarks description'>
              New to Lovely Letters?
              <Link to={{ pathname: "/auth/register" }} className='heavy'>
                {" "}
                Sign Up
              </Link>
            </div>
            <Login handleSubmit={login} redirect='/dashboard' />
          </div>
        </span>
      </>
    );
  };

  return <div id='landing'>{renderContent()}</div>;
};

export default LandingLogin;
