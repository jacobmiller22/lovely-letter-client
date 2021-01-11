import React, { useContext } from "react";
import { Link, Route } from "react-router-dom";
import ItemContext from "../../contexts/ItemContext";

import ItemList from "../items/ItemList";
import LetterDetail from "./LetterDetail";

const LetterLanding = ({ title }) => {
  const Item = useContext(ItemContext);

  const handleClick = (e) => {
    Item.setCat(e.target.name);
  };

  const letterContent = (item) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(item.date);

    return (
      <Link
        to={{
          pathname: `/letters/${item._id}`,
          prevRoute: window.location.pathname,
        }}
        className='item'
        key={item._id}>
        <div className='middle aligned content' style={{ paddingLeft: "1rem" }}>
          <div className='ui header'>
            {item.title}
            <div className='ui sub header'>
              {date.toLocaleDateString("en-US", options)}
            </div>
          </div>

          <div className='description'>
            <strong>From: </strong>
            {item.sender}
          </div>
        </div>
      </Link>
    );
  };

  const detailContent = <LetterDetail content={Item.letters} />;
  const FIELDS = [
    { key: "title", text: "Title", value: "title" },
    { key: "date", text: "Date", value: "date" },
  ];

  return (
    <div className='ui container'>
      <div className='ui three item stackable tabs menu'>
        <Link
          to={window.location.pathname}
          role='button'
          className={`${Item.cat === "inbox" ? "active" : ""} item`}
          data-tab='inbox'
          onClick={handleClick}
          name='inbox'>
          Inbox
        </Link>
        <Link
          to={window.location.pathname}
          role='button'
          className={`${Item.cat === "sent" ? "active" : ""} item`}
          data-tab='sent'
          onClick={handleClick}
          name='sent'>
          Sent
        </Link>
        <Link
          to={window.location.pathname}
          role='button'
          className={`${Item.cat === "drafts" ? "active" : ""} item`}
          data-tab='drafts'
          onClick={handleClick}
          name='drafts'>
          Drafts
        </Link>
      </div>
      <ItemList
        title={title}
        items={Item.letters}
        itemContent={letterContent}
        detailContent={detailContent}
        dir={Item.dir}
        setDir={Item.setDir}
        field={Item.field}
        setField={Item.setField}
        FIELDS={FIELDS}
      />
    </div>
  );
};

export default LetterLanding;
