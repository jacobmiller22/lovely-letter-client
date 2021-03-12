import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";

import { registerUser } from "../../../apis/user";
import { initRegisterCreds } from "../../../constants";
import { decodeJWT } from "../../../utils";

import Register from "./Register";

import "./LoginPanel.css";

const RegisterPanel = () => {
  const User = useContext(UserContext);

  let history = useHistory();

  const register = (e, vals, setState) => {
    if (e) e.preventDefault();

    (async () => {
      if (vals === initRegisterCreds) {
        return;
      }
      setState({ error: false, isLoading: true, success: false });

      const params = { user: vals };

      const errCallback = (code) => {
        switch (+code) {
          case 422:
            setState({
              error: true,
              isLoading: false,
              success: false,
              msg: "Username or Email is not available",
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
        const params = { ...vals };
        var res = await registerUser(params);
      } catch (err) {
        errCallback(err ? err.response.status : 500);
        return;
      }

      if (res && res.status === 200) {
        setState({
          error: false,
          isLoading: false,
          success: true,
          msg:
            "Thank you for registering. You will be redirected to the login screen promptly.",
        });
        setTimeout(() => history.push("/"), 3000);
      } else {
        errCallback(res ? res.status : 500);
      }
    })();
  };

  return (
    <div className="devise">
      <h1 className="ui centered header">Lovely Letters</h1>
      <div className="register-remarks description">Register here!</div>
      <Register handleSubmit={register} redirect="/dashboard" />
    </div>
  );
};

export default RegisterPanel;
