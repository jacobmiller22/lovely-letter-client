import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const Item = ({ item, onItemSelect }) => {
  const onItemClick = () => {
    if (onItemSelect) {
      onItemSelect(item);
    }
    return;
  };

  return (
    <Link
      to={`/${item.id}`}
      className="item"
      key={item.id}
      onClick={() => onItemClick()}
    >
      <div className="middle aligned content" style={{ paddingLeft: "2rem" }}>
        <div className="ui header">{item.data.title}</div>

        <div className="description">
          <strong>To: </strong>
          {item.recipient} <strong>From: </strong>
          {item.sender}
        </div>
      </div>
    </Link>
  );
};

export default Item;
