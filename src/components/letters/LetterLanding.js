import React from "react";
import { Link } from "react-router-dom";

import ItemList from "../items/ItemList";
import LetterDetail from "./LetterDetail";

const LetterLanding = ({
  letters,
  title,
  dir,
  setDir,
  field,
  setField,
  cat,
  setCat,
}) => {
  const handleClick = (e) => {
    setCat(e.target.name);
  };

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
    <div className='ui container'>
      <div className='ui three item stackable tabs menu'>
        <a
          role='button'
          className={`${cat === "inbox" ? "active" : ""} item`}
          data-tab='inbox'
          onClick={handleClick}
          name='inbox'>
          Inbox
        </a>
        <a
          role='button'
          className={`${cat === "sent" ? "active" : ""} item`}
          data-tab='sent'
          onClick={handleClick}
          name='sent'>
          Sent
        </a>
        <a
          role='button'
          className={`${cat === "drafts" ? "active" : ""} item`}
          data-tab='drafts'
          onClick={handleClick}
          name='drafts'>
          Drafts
        </a>
      </div>
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
