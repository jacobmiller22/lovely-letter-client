import React, { createContext, useState } from "react";

export const ItemContext = createContext();

const ItemProvider = ({ children }) => {
  const [dir, setDir] = useState("DESC");
  const [field, setField] = useState("date");
  const [cat, setCat] = useState("inbox");

  return (
    <ItemContext.Provider value={{ dir, setDir, field, setField, cat, setCat }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
