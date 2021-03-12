import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { initRegisterCreds } from "../../../constants";
import map from "lodash/map";

import { Form } from "react-bootstrap";
import LoadableButton from "../../LoadableButton";

const Register = ({ handleSubmit }) => {
  const [vals, setVals] = useState(initRegisterCreds);
  const [state, setState] = useState({
    isLoading: false,
    error: false,
    success: false,
    msg: "",
  });

  const User = useContext(UserContext);
  let history = useHistory();

  const onSubmit = (e) => {
    handleSubmit(e, vals, setState);

    if (state.type !== "error" || state.type !== "isLoading") {
      setVals(initRegisterCreds);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const tempVals = { ...vals, [name]: value };
    if (tempVals.password !== tempVals.password_2) {
      setState({
        isLoading: false,
        error: true,
        success: false,
        msg: "Passwords do not match.",
      });
    } else {
      setState({
        isLoading: false,
        error: false,
        success: false,
        msg: "",
      });
    }
    setVals(tempVals);
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
            <div key="error" className="error">
              <strong>Error</strong>
              <br />
              {msg || ""}
            </div>
          );
        case "success":
          return (
            <div key="success" className="success">
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

  const loginBtnCfg = {
    text: "Register",
    className: "login-btn",
    type: "submit",
  };

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
          name="email"
          placeholder="Email"
          value={vals.email}
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
      <Form.Group>
        <Form.Control
          name="password_2"
          type="password"
          placeholder="Confirm Password"
          value={vals.password_2}
          onChange={handleChange}
        />
      </Form.Group>

      <div id="form-msg-board">{renderMsg(state.msg)}</div>
      <LoadableButton isLoading={state.isLoading} btnCfg={loginBtnCfg} />
    </Form>
  );
};

export default Register;
