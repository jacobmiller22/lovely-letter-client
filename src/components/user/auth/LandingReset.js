import React from "react";
import { Link } from "react-router-dom";
import Reset from "./Reset";

import user from "../../../apis/user";

import { initResetCreds } from "../../../constants";

const LandingReset = () => {
  const reset = (e, vals) => {
    console.log(vals);
    if (e) e.preventDefault();

    (async () => {
      if (vals !== initResetCreds) {
        console.log(vals);
        const res = await user.post("/auth/reset", {
          username_email: vals.username_email,
        });
        if (res.status === 200) {
          // const { token } = res.data;
          // window.localStorage.setItem("jwt", token);
          // const { user } = decodeJWT(token);
          // User.setCurrUser(user);
          // history.push("/dashboard");
          console.log(res);
        } else {
          console.error(res.status);
        }
      }
    })();
  };

  return (
    <>
      <Link to='/'></Link>
      <span className='right-side-content'>
        <Link to={{ pathname: "/" }} className='back ui button'>
          Back
        </Link>
        <div className='devise'>
          <h1 className='ui centered header'>Reset Password</h1>
          <div className='register-remarks description'>
            {/* New to Lovely Letters?
            <Link to={{ pathname: "/auth/register" }} className='heavy'>
              {" "}
              Sign Up
            </Link> */}
          </div>
          <Reset handleSubmit={reset} init={initResetCreds} />
        </div>
      </span>
    </>
  );
};

export default LandingReset;
