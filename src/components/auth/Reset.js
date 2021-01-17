import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

import "./Auth.css";

const Login = ({ handleSubmit, signup, init }) => {
  const [vals, setVals] = useState(init);

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

  return (
    <div className='auth-window'>
      <form className='ui form' onSubmit={submit}>
        <div className='field'>
          <input
            name='username_email'
            type='text'
            placeholder='Username/Email'
            value={vals.username}
            onChange={handleChange}
          />
        </div>

        {/* <div>{renderSignUp()}</div> */}

        {/* <div>
          <div className={`options ui ${remember ? "checked" : ""} checkbox`}>
            <input
              type='checkbox'
              name='remember'
              value={remember}
              onClick={() => setRemember(!remember)}
            />
            <label>Remember me</label>
          </div>
          <Link to={{ pathname: "/auth/reset" }} className='pull-right'>
            Forgot password?
          </Link>
        </div> */}
        <div>
          <button className='ui button login' type='submit'>
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
