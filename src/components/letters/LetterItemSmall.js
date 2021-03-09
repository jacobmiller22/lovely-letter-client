import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./LetterItemLarge.css";

const LetterItemSmall = ({ config: { item, onItemSelect, tab } }) => {
  const onItemClick = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    return;
  };

  const renderAddress = () => {
    var address = null;

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
      to={{ pathname: `/letters/${item._id}` }}
      className="item"
      key={item.id}
      onClick={() => onItemClick()}
    >
      <Card>
        <Card.Body>
          <Card.Title className="inline">{item.title}</Card.Title>
          <Card.Subtitle className="pull-right inline subtitle">
            {new Date(item.dateSent).toLocaleDateString()}
          </Card.Subtitle>
          <Card.Footer>{renderAddress()}</Card.Footer>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default LetterItemSmall;
