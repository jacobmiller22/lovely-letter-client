import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

import { loginUser } from "../../../apis/user";
import { initLoginCreds } from "../../../constants";
import { decodeJWT } from "../../../utils";

import Login from "./Login";

import "./LoginPanel.css";

const RegisterPanel = () => {
  const User = useContext(UserContext);

  let history = useHistory();

  const login = (e, vals, setState) => {
    if (e) e.preventDefault();

    (async () => {
      if (vals === initLoginCreds) {
        return;
      }
      setState({ error: false, isLoading: true, success: false });

      const params = { user: vals };

      const errCallback = (code) => {
        switch (+code) {
          case 401:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Username or password incorrect.",
            });
            break;
          case 500:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Something went wrong...",
            });
            break;
          default:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Error",
            });
        }
      };

      try {
        var res = await loginUser(params);
      } catch (err) {
        errCallback(err ? err.response.status : 500);
        return;
      }

      if (res.status === 200) {
        const { token } = res.data;
        window.localStorage.setItem("jwt", token);
        const { user } = decodeJWT(token);
        User.setCurrUser(user);
        if (res.status === 200) {
          setState({
            error: false,
            isLoading: false,
            success: true,
            msg: "success",
          });
        }
        history.push("/dashboard");
      } else {
        errCallback(res ? res.status : 500);
      }
    })();
  };

  return (
    <div className="devise">
      <h1 className="ui centered header">Welcome back.</h1>
      <div className="register-remarks description">
        New to Lovely Letters?{" "}
        <Link to={{ pathname: "/auth/register" }} className="heavy">
          Sign Up
        </Link>
      </div>
      <Login handleSubmit={login} redirect="/dashboard" />
    </div>
  );
};

export default RegisterPanel;
