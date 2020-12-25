import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import LetterLanding from "./letters/LetterLanding";
import LetterDetail from "./letters/LetterDetail";

const App = () => {
  return (
    <div className="ui container">
      <BrowserRouter>
        <div>
          <Route path="/" exact component={LetterLanding} />
          <Route path="/:id" exact component={LetterDetail} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
