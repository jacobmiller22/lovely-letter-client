import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import map from "lodash/map";

import { Form } from "react-bootstrap";

import "./Auth.css";
import LoadableButton from "../../LoadableButton";

const Reset = ({ handleSubmit, init, stage }) => {
  const [debouncedVals, setDebouncedVals] = useState(init);
  const [vals, setVals] = useState(init);
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
      if (debouncedVals.new_password !== debouncedVals.new_password_2)
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

  const renderContinue = () => {
    let resetBtnCfg = {
      text: "Reset Password",
      className: "login-btn",
      type: "submit",
    };
    if (stage === 1) {
      resetBtnCfg = { ...resetBtnCfg, text: "Next" };
      return (
        <>
          <div id="form-msg-board">{renderMsg(state.msg)}</div>
          <LoadableButton isLoading={state.isLoading} btnCfg={resetBtnCfg} />
        </>
      );
    }
    return (
      <>
        <Form.Group>
          <Form.Control
            name="new_password"
            type="password"
            placeholder="New password"
            value={vals.new_password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="new_password_2"
            type="password"
            placeholder="Retype new password"
            value={vals.new_password_2}
            onChange={handleChange}
          />
        </Form.Group>
        <div id="form-msg-board">{renderMsg(state.msg)}</div>
        <LoadableButton isLoading={state.isLoading} btnCfg={resetBtnCfg} />
      </>
    );
  };

  return (
    <Form onSubmit={onSubmit}>
      {stage === 1 ? (
        <Form.Group>
          <Form.Control
            name="username_email"
            placeholder="Username/Email"
            value={vals.username_email}
            onChange={handleChange}
          />
        </Form.Group>
      ) : null}

      {renderContinue()}
    </Form>
  );
};

export default Reset;
