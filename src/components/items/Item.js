import React from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import "./Item.css";

const Item = ({ item, onItemSelect }) => {
  const onItemClick = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    return;
  };

  return (
    <Link
      to={`/${item._id}`}
      className="item"
      key={item.id}
      onClick={() => onItemClick()}
    >
      <Card>
        <Card.Title className="title">{item.title}</Card.Title>
        <Card.Subtitle>
          {new Date(item.dateSent).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Body></Card.Body>
        <Card.Footer>
          <div>
            <strong>To: </strong>
            {item._receiver.username}
          </div>

          <div>
            <strong>From: </strong>
            {item._sender.username}
          </div>
        </Card.Footer>
      </Card>
    </Link>
  );
};

export default Item;
