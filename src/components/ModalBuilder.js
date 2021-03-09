import Modal from "react-bootstrap/Modal";
import map from "lodash/map";

const ModalBuilder = ({ config }) => {
  if (!config) {
    return null;
  }

  const {
    open,
    title,
    body,
    children,
    actions,
    handleClose,
    size,
    centered,
  } = config;

  const renderActions = () => {
    return map(actions, (action) => {
      return action;
    });
  };

  return (
    <Modal
      show={open}
      onHide={handleClose}
      size={size || "lg"}
      centered={centered === undefined ? true : centered}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body || children}</Modal.Body>
      <Modal.Footer>{renderActions()}</Modal.Footer>
    </Modal>
  );
};

export default ModalBuilder;
