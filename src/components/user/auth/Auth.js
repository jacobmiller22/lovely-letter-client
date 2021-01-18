import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
// import { initLoginCreds } from "../../constants";

import "./Auth.css";

const Auth = ({ handleSubmit, signup, init, action }) => {
  const [vals, setVals] = useState(init);
  const [remember, setRemember] = useState(
    window.localStorage.getItem("remember") !== undefined
  );

  const User = useContext(UserContext);
  let history = useHistory();

  const submit = (e) => {
    handleSubmit(e, vals);
    setVals(init);
  };

  const handleChange = ({ target: { name, value } }) => {
    setVals({ ...vals, [name]: value });
  };

  if (User.currUser) {
    history.push("/dashboard");
  }

  // const renderSignUp = () => {
  //   if (signup) {
  //     return (
  //       <>
  //         <button className='ui button' type='submit'>
  //           Login
  //         </button>
  //         {"Or,  "}
  //         <Link to={{ pathname: "/auth/register" }}> Sign Up</Link>
  //       </>
  //     );
  //   }
  //   return null;
  // };

  // const renderOptions = () => {
  //   return (
  //     <>
  //       <div className={`options ui ${remember ? "checked" : ""} checkbox`}>
  //         <input
  //           type='checkbox'
  //           name='remember'
  //           value={remember}
  //           onClick={() => setRemember(!remember)}
  //         />
  //         <label>Remember me</label>
  //       </div>
  //       <Link to={{ pathname: "/auth/reset" }} className='pull-right'>
  //         Forgot password?
  //       </Link>
  //     </>
  //   );
  // };

  const renderAction = () => {
    if (action) {
      <button className='ui button login' type='submit'>
        Reset Password
      </button>;
    }

    return (
      <button className='ui button login' type='submit'>
        Login
      </button>
    );
  };

  return (
    <div className='auth-window'>
      <form className='ui form' onSubmit={submit}>
        <div className='field'>
          <input
            name='username'
            type='text'
            placeholder='Username'
            value={vals.username}
            onChange={handleChange}
          />
        </div>

        <div className='field'>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={vals.password}
            onChange={handleChange}
          />
        </div>

        {/* <div>{renderSignUp()}</div> */}

        {/* <div>{renderOptions()}</div> */}

        <div>{renderAction()}</div>
      </form>
    </div>
  );
};

export default Auth;
