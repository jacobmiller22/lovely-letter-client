import React from "react";

const ItemDetail = ({ item }) => {
  if (!item) {
    return null;
  }

  const renderContact = () => {
    if (!item.contact || !item.contact.email) {
      return (
        <a href={`mailto:${item.detail.contact.email}`}>
          {item.detail.contact.email}
        </a>
      );
    }
    return "Contact jacobmiller22@vt.edu";
  };

  return (
    <div>
      <div className="ui embed">
        <iframe title={"re"} src=""></iframe>
      </div>
      <div className="ui segment">
        <div className="ui large header">{item.title}</div>
        <div className="ui description">{item.detail.description}</div>
        <p></p>
        <div className="ui description">{item.detail.description}</div>
        <p></p>
        <div className="ui description">{renderContact()}</div>
      </div>
    </div>
  );
};

export default ItemDetail;
