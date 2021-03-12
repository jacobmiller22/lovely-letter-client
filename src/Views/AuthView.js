import { Col, Row } from "react-bootstrap";

import "./AuthView.css";

const AuthView = ({ children }) => {
  console.log(children);
  return (
    <Row>
      <Col className="left-side"></Col>
      <Col className="right-side">{children}</Col>
    </Row>
  );
};

export default AuthView;
