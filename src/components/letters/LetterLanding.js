import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import ItemList from "../items/ItemList";
import LetterDetail from "./LetterDetail";

const LetterLanding = ({ letters, title, currUser }) => {
  const letterContent = (item) => {
    return (
      <Link to={`/${item._id}`} className='item' key={item._id}>
        <div className='middle aligned content' style={{ paddingLeft: "1rem" }}>
          <div className='ui header'>{item.title}</div>

          <div className='description'>
            <strong>To: </strong>
            {item.receiver} <strong>From: </strong>
            {item.sender}
          </div>
        </div>
      </Link>
    );
  };

  const detailContent = <LetterDetail content={letters} />;

  return (
    <div>
      <ItemList
        title={title}
        items={letters}
        itemContent={letterContent}
        detailContent={detailContent}
      />
    </div>
  );
};

export default LetterLanding;
