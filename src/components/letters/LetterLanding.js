import React from "react";
import { Link } from "react-router-dom";

import ItemList from "../ItemList";
import LetterDetail from "./LetterDetail";

import letters from "../../db/letters";

const LetterLanding = ({ props }) => {
  const letterContent = (item) => {
    return (
      <Link to={`/${item.id}`} className="item" key={item.id}>
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

  return (
    <div>
      <ItemList
        items={letters}
        itemContent={letterContent}
        detailContent={LetterDetail}
      />
    </div>
  );
};

export default LetterLanding;
