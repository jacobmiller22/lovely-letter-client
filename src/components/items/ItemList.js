import { useState, useEffect } from "react";
import _ from "lodash";

import { Container, Row, Spinner } from "react-bootstrap";

import Item from "./Item";

import "./ItemList.css";

const ItemList = ({
  config: { items, CustomItem, tab, handleListUpdate, title, isLoading },
}) => {
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setShowSpinner(true);
      }, 2000);
    } else {
      setShowSpinner(false);
    }
  }, [showSpinner]);

  const renderItems = (onItemSelect) => {
    if (isLoading && showSpinner) {
      return <Spinner animation="border" />;
    }
    if (isLoading || !items) {
      return null;
    }
    if (!items.length) {
      return <div>No items...</div>;
    }

    if (CustomItem) {
      return _.map(items, (item) => {
        const itemCfg = {
          item,
          onItemSelect,
          tab,
          handleListUpdate,
        };
        return <CustomItem key={item._id} config={itemCfg} />;
      });
    }
    return _.map(items, (item) => (
      <Item item={item} onItemSelect={onItemSelect} key={item._id} tab={tab} />
    ));
  };

  return (
    <Container>
      <Row>
        <h3>{title}</h3>
      </Row>
      <Row>
        <div className="item-list">{renderItems()}</div>
      </Row>
    </Container>
  );
};

export default ItemList;
