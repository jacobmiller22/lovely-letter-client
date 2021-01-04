import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../apis/user";

const Login = ({ currUser, setCurrUser }) => {
  const initialValues = { username: "", password: "" };
  const [vals, setVals] = useState(initialValues);

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Input: ", vals);
    (async () => {
      const res = await user.get("/auth", { params: { user: vals } });
      window.localStorage.setItem("jwt", res.data.token);
      setCurrUser(res.data);
    })();
  };

  return (
    <div className='auth-window'>
      <form className='ui form' onSubmit={handleSubmit}>
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
