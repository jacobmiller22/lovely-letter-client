import React, { useEffect, useState } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./Header";
import Dashboard from "./Dashboard";
import Register from "./auth/Register";
import LetterDetail from "./letters/LetterDetail";
import LetterCreate from "./letters/LetterCreate";

import letterApi from "../apis/letter";
import ContactLanding from "./contacts/ContactLanding";

const App = () => {
  const [letters, setLetters] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dir, setDir] = useState("DESC");
  const [field, setField] = useState("date");
  const [cat, setCat] = useState("inbox");

  useEffect(() => {
    const getJWTToken = () => {
      const token = window.localStorage.getItem("jwt");
      // Decode token
      if (token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        var { user } = JSON.parse(window.atob(base64));
      }

      setCurrUser(user);
    };
    getJWTToken();
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchLetters = async () => {
      const where = (cat, currUser) => {
        switch (cat) {
          case "inbox":
            return { receiver: currUser.username };
          case "sent":
            return { sender: currUser.username };
          case "drafts":
            return { sender: currUser.username, isDraft: true };
          default:
            return { receiver: currUser.username };
        }
      };

      const res = await letterApi.get("/letters", {
        params: {
          q: JSON.stringify({
            where: where(cat, currUser),
            order: `${field} ${dir}`,
          }),
        },
      });
      setLetters(res.data);
    };

    if (currUser) {
      fetchLetters();
    } else {
      setLetters([]);
    }
  }, [currUser, dir, field, cat]);

  const Dash = (props) => (
    <Dashboard
      letters={letters}
      currUser={currUser}
      setCurrUser={setCurrUser}
      setIsLoggedIn={setIsLoggedIn}
      dir={dir}
      setDir={setDir}
      field={field}
      setField={setField}
      cat={cat}
      setCat={setCat}
      {...props}
    />
  );
  const Detail = (props) => <LetterDetail letters={letters} {...props} />;

  const Create = (props) => <LetterCreate currUser={currUser} {...props} />;

  const Contact = (props) => (
    <ContactLanding
      title='Contacts'
      currUser={currUser}
      dir={dir}
      field={field}
      cat={cat}
      setCat={setCat}
      {...props}
    />
  );

  return (
    <div className='ui container'>
      <BrowserRouter>
        <div>
          <Header currUser={currUser} setCurrUser={setCurrUser} />
          <Route path='/' exact component={Dash} />
          <Route path='/contacts' exact component={Contact} />
          <Route path='/auth/register' exact component={Register} />
          <Route path='/letters/:_id' exact component={Detail} />
          <Route path='/drafts/new' exact component={Create} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
