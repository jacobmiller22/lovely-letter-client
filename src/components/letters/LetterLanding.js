import React from "react";
import { Link } from "react-router-dom";

import ItemList from "../items/ItemList";
import LetterDetail from "./LetterDetail";

const LetterLanding = ({ letters, title, dir, setDir, field, setField }) => {
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
  const FIELDS = [
    { key: "title", text: "Title", value: "title" },
    { key: "date", text: "Date", value: "date" },
  ];
  return (
    <div>
      <ItemList
        title={title}
        items={letters}
        itemContent={letterContent}
        detailContent={detailContent}
        dir={dir}
        setDir={setDir}
        field={field}
        setField={setField}
        FIELDS={FIELDS}
      />
    </div>
  );
};

export default LetterLanding;
