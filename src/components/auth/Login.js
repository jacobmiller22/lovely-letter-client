import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../apis/user";

const Login = ({ currUser, setCurrUser, setIsLoggedIn }) => {
  const initialValues = { username: "", password: "" };
  const [vals, setVals] = useState(initialValues);

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    (async () => {
      const res = await user.get("/auth", { params: { user: vals } });
      console.log(res);
      if (res.status === 200) {
        const { token } = res.data;
        console.log(token);
        window.localStorage.setItem("jwt", token);

        if (token) {
          var base64Url = token.split(".")[1];
          var base64 = base64Url.replace("-", "+").replace("_", "/");
          var { userClaims } = JSON.parse(window.atob(base64));
        }
        setCurrUser(userClaims);
        setIsLoggedIn(true);
      }
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
