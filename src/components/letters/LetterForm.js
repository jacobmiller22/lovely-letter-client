import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Form, Button } from "react-bootstrap";

import "./LetterForm.css";

const LetterForm = ({ config: { onSubmit, setIsPristine, vals, setVals } }) => {
  const [isDraft, setIsDraft] = useState(false);

  let history = useHistory();

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });

    if (vals.title === "" && vals.receiver === "" && vals.content === "") {
      setIsPristine(true);
    } else {
      setIsPristine(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...vals, isDraft });
    history.push("/");
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="form">
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            placeholder="Title"
            value={vals.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Recipient</Form.Label>
          <Form.Control
            name="receiver"
            placeholder="Recipient"
            value={vals.receiver}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Content</Form.Label>
          <Form.Control
            name="content"
            placeholder="Enter message here..."
            as="textarea"
            rows={15}
            value={vals.content}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Button className="btn" type="submit">
            Send
          </Button>
          <Button
            className="btn"
            onClick={() => {
              setIsDraft(true);
            }}
          >
            Save as Draft
          </Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default LetterForm;
