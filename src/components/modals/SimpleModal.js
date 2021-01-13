import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "semantic-ui-react";

import _ from "lodash";

const SimpleModal = ({ open, setOpen, title, content, actions }) => {
  const renderActions = () => {
    return _.map(actions, (action) => {
      return action;
    });
  };

  return (
    <Modal open={open} dimmer={open}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>{renderActions()}</Modal.Actions>
    </Modal>
  );
};

export default SimpleModal;
