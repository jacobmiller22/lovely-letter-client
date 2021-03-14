import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { initRegisterCreds } from "../../../constants";
import map from "lodash/map";
import { validateEmails, checkUsername } from "../../../utils/validate";

import { Form } from "react-bootstrap";
import LoadableButton from "../../LoadableButton";

const Register = ({ handleSubmit }) => {
  const [debouncedVals, setDebouncedVals] = useState(initRegisterCreds);
  const [vals, setVals] = useState(initRegisterCreds);
  const [state, setState] = useState({
    isLoading: false,
    error: false,
    success: false,
    msg: "",
  });

  const User = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedVals(vals);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [vals]);

  useEffect(() => {
    (async () => {
      if (await checkUsername(debouncedVals.username)) {
        var msg = `Username '${debouncedVals.username}' is unavailable`;
        console.log(msg);
      } else if (validateEmails([debouncedVals.email]).length !== 0)
        var msg = "The provided email address is invalid.";
      else if (debouncedVals.password !== debouncedVals.password_2)
        var msg = "The provided email address is invalid.";
      else var msg = "";

      setState({
        isLoading: false,
        error: msg.length !== 0,
        success: false,
        msg: msg,
      });
    })();
  }, [debouncedVals]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!state.error) {
      handleSubmit(e, vals, setState);
    }
    // if (!state.error || !state.isLoading || !state.success) {
    //   setVals(initRegisterCreds);
    // }
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
