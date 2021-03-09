import { Link } from "react-router-dom";

import { deleteLetter } from "../../apis/letter";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { XCircleFill } from "react-bootstrap-icons";

import "./LetterItemLarge.css";

const LetterItemLarge = ({
  config: { item, onItemSelect, tab, handleListUpdate },
}) => {
  const onItemClick = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    return;
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const params = {
      _id: item._id,
    };
    console.log(params);
    (async () => {
      const res = await deleteLetter(params);
      handleListUpdate(item._id);
    })();
  };

  const renderAddress = () => {
    var address = null;
    console.log(tab);
    switch (tab) {
      case "inbox":
        address = item._sender.username;
        break;
      case "sent":
        address = item._receiver.username;
        break;
      case "drafts":
        address = item._receiver.username;
        break;
      default:
        return null;
    }

    return <div className="letter-address">{address}</div>;
  };

  return (
    <Link
      key={item.id}
      className="item"
      to={{ pathname: `/letters/${item._id}` }}
      onClick={() => onItemClick()}
    >
      <Card>
        <Row className="align-items-center">
          <Col sm={11}>
            <Card.Body className="body">
              <Card.Title className="inline">{item.title}</Card.Title>
              <Card.Subtitle className="pull-right inline subtitle">
                {new Date(item.dateSent).toLocaleDateString()}
              </Card.Subtitle>

              <Card.Footer>{renderAddress()}</Card.Footer>
            </Card.Body>
          </Col>
          <Col className="hide" sm={1}>
            <XCircleFill
              className="delete-btn"
              size={24}
              onClick={handleDelete}
            />
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

export default LetterItemLarge;
