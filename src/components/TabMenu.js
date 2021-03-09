import { useState } from "react";
import _ from "lodash";

import { Col } from "react-bootstrap";

import "./TabMenu.css";

const TabMenu = ({ tabs, activeKey, onSelect }) => {
  return _.map(tabs, (tab) => {
    const isActive = tab.key === activeKey ? "active" : "";
    return (
      <Col
        key={tab.key}
        className={`tab-menu-tab ${isActive}`}
        onClick={(e) => {
          e.preventDefault();
          onSelect(tab.key);
        }}
      >
        {tab.title}
      </Col>
    );
  });
};

export default TabMenu;
