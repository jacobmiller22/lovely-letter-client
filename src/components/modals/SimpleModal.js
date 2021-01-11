import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";

const SimpleModal = ({ open, setOpen, redirect, title, content }) => {
  return (
    <Modal open={open} dimmer={open}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Link
          to={redirect}
          className='ui button'
          onClick={() => setOpen(false)}>
          Ok
        </Link>
      </Modal.Actions>
    </Modal>
  );
};

export default SimpleModal;
