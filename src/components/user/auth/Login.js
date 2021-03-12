import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import map from "lodash/map";
import { initLoginCreds } from "../../../constants";

import { Form, Button } from "react-bootstrap";
import LoadableButton from "../../LoadableButton";

import "./Login.css";

const Login = ({ handleSubmit }) => {
  const [vals, setVals] = useState(initLoginCreds);
  const [state, setState] = useState({
    isLoading: false,
    error: false,
    success: false,
    msg: "",
  });
  const [remember, setRemember] = useState(
    window.localStorage.getItem("remember") !== undefined
  );

  const User = useContext(UserContext);
  let history = useHistory();

  const onSubmit = (e) => {
    handleSubmit(e, vals, setState);

    if (state.type !== "error") {
      setVals(initLoginCreds);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setVals({ ...vals, [name]: value });
  };

  if (User.currUser) {
    history.push("/dashboard");
  }

  const renderMsg = (msg) => {
    const stateTypes = ["error", "success"];
    return map(stateTypes, (type) => {
      if (!state[type]) {
        return null;
      }

      switch (type) {
        case "error":
          return (
            <div className="error">
              <strong>Error</strong>
              <br />
              {msg || ""}
            </div>
          );
        case "success":
          return (
            <div className="success">
              <strong>Success</strong>
              <br />
              {msg || ""}
            </div>
          );
        default:
          return null;
      }
    });
  };

  const loginBtnCfg = { text: "Login", className: "login-btn", type: "submit" };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Control
          name="username"
          placeholder="Username"
          value={vals.username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          value={vals.password}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group inline>
        <Form.Check
          value={remember}
          onClick={() => setRemember(!remember)}
          label="Remember me"
          inline
        />
        <Link to={{ pathname: "/auth/reset" }} className="pull-right text">
          Forgot password?
        </Link>
      </Form.Group>

      <div id="form-msg-board">{renderMsg(state.msg)}</div>
      <LoadableButton isLoading={state.isLoading} btnCfg={loginBtnCfg} />
    </Form>
  );
};

export default Login;
