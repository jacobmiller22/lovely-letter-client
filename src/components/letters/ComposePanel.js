import { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Button, Card } from "react-bootstrap";

import "./ComposePanel.css";

const ComposePanel = () => {
  const initialValues = { title: "", receiver: "", content: "" };
  const [vals, setVals] = useState(initialValues);

  const handleChange = (e) => {
    e.preventDefault();
    const { target } = e;
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const ComposeForm = () => {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={vals.title}
            placeholder="Title"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Recipient</Form.Label>
          <Form.Control
            name="receiver"
            value={vals.receiver}
            placeholder="Recipient"
            onChange={handleChange}
            autoComplete="off"
          />
        </Form.Group>
        <Form.Group>
          <Link
            to={{
              pathname: "/drafts/new",
              state: {
                vals,
                // prevRoute: location.pathname,
              },
            }}
          >
            <Button type="submit" id="submit-btn">
              Compose
            </Button>
          </Link>
        </Form.Group>
      </Form>
    );
  };

  return <Card>{ComposeForm()}</Card>;
};

export default ComposePanel;
