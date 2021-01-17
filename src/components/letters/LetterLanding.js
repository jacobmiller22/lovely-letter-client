import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import ItemContext from "../../contexts/ItemContext";

import ItemList from "../items/ItemList";
import SimpleModal from "../modals/SimpleModal";
import LetterDetail from "./LetterDetail";

import letterApi from "../../apis/letter";

import "./LetterLanding.css";

const LetterLanding = ({ title, history }) => {
  const [open, setOpen] = useState(false);
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

    const date = new Date(item.dateSent);

    if (!item) {
      console.log("Does this run?");
      return (
        <div className='item'>
          <div className='fluid placeholder header'></div>
          <div className='very long line'></div>
          <div className='medium line'></div>
          <div className='short line'></div>
        </div>
      );
    }

    const handleDelete = () => {
      letterApi.delete();
    };

    const subject = Item.cat === "sent" ? item.receiver : item.sender;
    const cancelButton = (
      <div key='cancel' className='ui button'>
        Cancel
      </div>
    );
    const deleteButton = (
      <div key='delete' className='ui red button' onClick={handleDelete}>
        Delete
      </div>
    );

    return (
      <Link
        to={{
          pathname: `/letters/${item._id}`,
          prevRoute: window.location.pathname,
        }}
        className='ui fluid item'
        key={item._id}>
        <SimpleModal
          open={open}
          setOpen={setOpen}
          title='Delete Letter?'
          content='Are you sure you want to delete this letter? Any deleted letters will not be recoverable'
          actions={[cancelButton, deleteButton]}
        />
        <div className='ui container'>
          <div className='ui right floated sub header'>{subject}</div>
          <div
            className='middle aligned content'
            style={{ paddingLeft: "1rem" }}>
            <div className='ui header'>
              {item.title}

              <div className='ui sub header'>
                {date.toLocaleDateString("en-US", options)}
              </div>
            </div>
            <div
              className='extra ui right floated icon button'
              onClick={(e) => {
                e.preventDefault();
                setOpen(true);
                history.push(window.location.pathname);
              }}>
              <i className='ui red trash alternate outline icon' />
            </div>
            <div className='description'>
              <strong>From: </strong>
              {item._sender.username}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const detailContent = <LetterDetail content={Item.letters} />;
  const FIELDS = [
    { key: "title", text: "Title", value: "title" },
    { key: "dateSent", text: "Date", value: "dateSent" },
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
