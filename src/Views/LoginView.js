import { Col, Row } from "react-bootstrap";

import LoginPanel from "../components/user/auth/LoginPanel";

import "./LoginView.css";

const LoginView = () => {
  return (
    <Row>
      <Col className="left-side"></Col>
      <Col className="right-side">
        <LoginPanel />
      </Col>
    </Row>
  );
};

export default LoginView;
