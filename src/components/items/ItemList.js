import React, { useState } from "react";

import Item from "./Item";
import ItemDetail from "./ItemDetail";

const ItemList = ({ items, variant, title, itemContent, detailContent }) => {
  const [selected, setSelected] = useState(null);

  const onItemSelect = (item) => {
    setSelected(item);
  };

  const renderFocusDetail = () => {
    if (!selected) {
      return (
        <div className="ui container">
          <div className="ui divided items">{renderItems(onItemSelect)}</div>
        </div>
      );
    }
    console.log("SHOW DETAIL")
    if (detailContent) {
      return detailContent(selected);
    }
    return <ItemDetail item={selected} />;
  };

  const renderItems = (onItemSelect) => {
    
    if (itemContent) {
      
      if (!onItemSelect) {
        // Figure out what to do if we do not have a callback for selecting an item
      }
      return items.map((item) => {
        return itemContent(item, onItemSelect);
      });
    }

  
    return items.map((item) => {
      return <Item item={item} onItemSelect={onItemSelect} key={item._id} />;
    });
  };

  return (
    <div>
      <h1>{title}</h1>
      {renderFocusDetail()}
    </div>
  );
};

export default ItemList;
