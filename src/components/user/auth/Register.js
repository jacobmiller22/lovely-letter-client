import React, { useState } from "react";
import userApi from "../../../apis/user";
import { useHistory } from "react-router-dom";

const Login = () => {
  const initialValues = { username: "", password: "" };
  const [vals, setVals] = useState(initialValues);

  let history = useHistory();

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    (async () => {
      const res = await userApi.post("/auth", { ...vals });
      history.push("/dashboard");
    })();
  };

  return (
    <div className="auth-window">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <div className="ui input">
            <input
              name="username"
              type="text"
              placeholder="Username"
              value={vals.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <div className="ui labeled input">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={vals.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <button className="ui button" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
