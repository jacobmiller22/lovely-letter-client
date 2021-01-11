import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { initLoginCreds } from "../../constants";

const Login = ({
  redirect,
  history,
  setLoginCreds,
  loginCreds,
  handleSubmit,
}) => {
  const [vals, setVals] = useState(initLoginCreds);

  const User = useContext(UserContext);

  const submit = (e) => {
    setLoginCreds(vals);
    handleSubmit(e, vals);
    setVals(initLoginCreds);
    history.push(redirect);
  };

  const handleChange = ({ target: { name, value } }) => {
    setVals({ ...vals, [name]: value });
  };

  if (User.currUser) {
    history.push("/dashboard");
  }

  if (!loginCreds) {
    return null;
  }

  return (
    <div className='auth-window'>
      <form className='ui form' onSubmit={submit}>
        <div className='field'>
          <div className='ui input'>
            <input
              name='username'
              type='text'
              placeholder='Username'
              value={vals.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='field'>
          <div className='ui labeled input'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={vals.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button className='ui button' type='submit'>
            Login
          </button>
          {"Or,  "}
          <Link to={{ pathname: "/auth/register" }}> Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
