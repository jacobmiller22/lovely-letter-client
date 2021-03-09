import React, { useState, useContext, useEffect, cloneElement } from "react";
import { Link } from "react-router-dom";
import ItemContext from "../../contexts/ItemContext";
import UserContext from "../../contexts/UserContext";
import map from "lodash/map";
import { getLetters } from "../../apis/letter";

import ItemList from "../items/ItemList";

import TabMenu from "../TabMenu";
import { Row } from "react-bootstrap";

const LetterPanel = ({ Item, children }) => {
  const [tab, setTab] = useState("inbox");

  const [activeField, setActiveField] = useState({
    key: "dateSent",
    text: "Date",
  });

  const [firstRender, setFirstRender] = useState(true);
  const [dir, setDir] = useState("DESC");

  const [listCfg, setListCfg] = useState({
    title: "Letters",
    isLoading: true,
    dir,
    CustomItem: Item,
    items: null,
  });

  const { currUser } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const params = { tab, activeField, dir };
      setListCfg({ ...listCfg, isLoading: true });
      const res = await getLetters(params, currUser);
      if (res !== undefined) {
        setListCfg({ ...listCfg, items: res.data, isLoading: false });
      }
    })();
  }, [tab, dir, currUser]);

  const handleListUpdate = (_id) => {
    setListCfg({
      ...listCfg,
      items: listCfg.items.filter((item) => item._id !== _id),
    });
  };
  const renderTabs = () => {
    const tabs = [
      { title: "Inbox", key: "inbox" },
      { title: "Sent", key: "sent" },
      { title: "Drafts", key: "drafts" },
    ];
    return (
      <Row className="tab-menu-container">
        <TabMenu tabs={tabs} activeKey={tab} onSelect={(k) => setTab(k)} />
      </Row>
    );
  };

  const renderChildren = () => {
    const fields = [
      { key: "title", text: "Title" },
      { key: "dateSent", text: "Date" },
    ];

    if (!children) {
      return null;
    }

    return cloneElement(children, {
      active: activeField,
      setActive: setActiveField,
      fields,
      dir,
      setDir,
    });
  };

  return (
    <div>
      {renderTabs()}
      {renderChildren()}
      <ItemList config={{ ...listCfg, tab, activeField, handleListUpdate }} />
    </div>
  );
};

export default LetterPanel;
