import React, { useState } from "react";

import Item from "./Item";
import ItemDetail from "./ItemDetail";
import { Dropdown } from "semantic-ui-react";

import _ from "lodash";

const ItemList = ({
  items,
  dir,
  setDir,
  field,
  setField,
  FIELDS,
  title,
  itemContent,
  detailContent,
}) => {
  const [selected, setSelected] = useState(null);

  const onItemSelect = (item) => {
    setSelected(item);
  };

  const renderFocusDetail = () => {
    if (!selected) {
      return (
        <div className='ui container'>
          <div className='ui divided items'>{renderItems(onItemSelect)}</div>
        </div>
      );
    }
    console.log("SHOW DETAIL");
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

  const renderArrow = () => {
    if (dir === "ASC") {
      return <i className='angle up icon' />;
    }
    if (dir === "DESC") {
      return <i className='angle down icon' />;
    }
    return null;
  };

  return (
    <div>
      <div className='ui large header'>
        {title}
        <button
          className='ui circular icon button'
          onClick={() => setDir(dir === "ASC" ? "DESC" : "ASC")}>
          {renderArrow()}
        </button>
        <Dropdown
          placeholder='Sort by:'
          selection
          options={FIELDS}
          onChange={(e, { value }) => setField(value)}
          value={field}
        />
      </div>
      {renderFocusDetail()}
    </div>
  );
};

export default ItemList;
