import { useContext } from "react";
import UserContext from "../contexts/UserContext";

import { Container, Row, Col } from "react-bootstrap";

import ComposePanel from "../components/letters/ComposePanel";
import LetterPanel from "../components/letters/LetterPanel";
import LetterItemSmall from "../components/letters/LetterItemSmall";

import "./Dashboard.css";

const Dashboard = () => {
  const User = useContext(UserContext);

  const renderWelcome = () => {
    if (User.currUser) {
      return <h3 className="centered">Welcome, {User.currUser.username}!</h3>;
    }
    return null;
  };

  const renderContent = () => {
    return (
      <div className="content">
        <h4 className="ui medium header">Updates</h4>
        <div className="ui description">Update details will be given here!</div>
      </div>
    );
  };

  return (
    <Container fluid="md">
      <Row>
        <Col>
          {renderWelcome()}
          {renderContent()}
        </Col>

        <Col>
          <ComposePanel />
          <LetterPanel Item={LetterItemSmall}></LetterPanel>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
