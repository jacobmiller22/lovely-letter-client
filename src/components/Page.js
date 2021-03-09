import { Link } from "react-router-dom";

import { Container, Row } from "react-bootstrap";

import "./Page.css";

const Page = ({ children, title, backCfg: { to = {}, onClick } = {} }) => {
  return (
    <Container>
      <Row className="divider bottom">
        <Link className="btn" to={to || {}} onClick={onClick}>
          Back
        </Link>
        <h3 className="header">{title}</h3>
      </Row>
      <Row>{children}</Row>
    </Container>
  );
};

export default Page;
