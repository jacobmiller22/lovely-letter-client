import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import map from "lodash/map";

import { Form } from "react-bootstrap";

import "./Auth.css";
import LoadableButton from "../../LoadableButton";

const Reset = ({ handleSubmit, init, stage }) => {
  const [vals, setVals] = useState(init);
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

    if (state.type !== "error") {
      setVals(init);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    const tempVals = { ...vals, [name]: value };
    if (tempVals.new_password !== tempVals.new_password_2) {
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

  const renderContinue = () => {
    let resetBtnCfg = {
      text: "Reset Password",
      className: "login-btn",
      type: "submit",
    };
    if (stage === 1) {
      resetBtnCfg = { ...resetBtnCfg, text: "Next" };
      return (
        <LoadableButton isLoading={state.isLoading} btnCfg={resetBtnCfg} />
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
      <div id="form-msg-board">{renderMsg(state.msg)}</div>
      {renderContinue()}
    </Form>
  );
};

export default Reset;
