import { getLetter } from "../../apis/letter";

import { useEffect, useState } from "react";

import { Container, Row, Card } from "react-bootstrap";

import "./LetterDetail.css";

const LetterDetail = ({ _id }) => {
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    const params = { _id };

    (async () => {
      const res = await getLetter(params);
      if (res.status === 200) {
        setLetter({ ...res.data });
      } else {
        setLetter({});
      }
    })();
  }, []);

  if (!letter) {
    return null;
  }

  if (!letter._id) {
    return <p>Letter does not exist</p>;
  }

  console.log(letter);
  return (
    <Container>
      <Row>
        <Card>
          <Card.Body>
            <Card.Title>
              <h2>{letter.title}</h2>
              <Card.Subtitle>{letter._sender.username}</Card.Subtitle>
            </Card.Title>
            <Card.Text>{letter.content}</Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <h1 className="ui header">
        <div className="ui sub header"></div>
      </h1>
    </Container>
  );
};

export default LetterDetail;

/// #1E70BF
