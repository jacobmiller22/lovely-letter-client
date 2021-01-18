import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

import Login from "./Login";

import user from "../../../apis/user";

import { initLoginCreds } from "../../../constants";
import { decodeJWT } from "../../../utils";

import "./LandingLogin.css";

const LandingLogin = () => {
  // const [showError, setShowError] = useState(null);

  const User = useContext(UserContext);

  let history = useHistory();

  const login = (e, vals, setState) => {
    if (e) e.preventDefault();

    (async () => {
      if (vals !== initLoginCreds) {
        const res = await user
          .get("/auth", { params: { user: vals } })
          .catch((err) => {
            console.log("error", err.response);
            const code = err.response.status;

            switch (code) {
              case 401:
                setState({ type: "error", msg: "Invalid credentials" });
                return;
              default:
                return;
            }
          });
        if (res) {
          const { token } = res.data;
          window.localStorage.setItem("jwt", token);
          const { user } = decodeJWT(token);
          User.setCurrUser(user);
          history.push("/dashboard");

          if (res.status === 200)
            setState({ type: "success", msg: "Login successful" });
        }
      }
    })();
  };

  const renderContent = () => {
    // if (showError) {
    //   return <div>THERE HAS BEEN AN ERROR</div>;
    // }
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
