import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Login from "./auth/Login";
import Dashboard from "./Dashboard";
import Register from "./auth/Register";
import LetterDetail from "./letters/LetterDetail";
import LetterCreate from "./letters/LetterCreate";
import SimpleModal from "./modals/SimpleModal";

import letterApi from "../apis/letter";
import ContactLanding from "./contacts/ContactLanding";

import user from "../apis/user";

import UserContext from "../contexts/UserContext";
import ItemContext from "../contexts/ItemContext";

import { decodeJWT } from "../utils";
import { initLoginCreds } from "../constants";

const App = (props) => {
  const [letters, setLetters] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dir, setDir] = useState("DESC");
  const [field, setField] = useState("date");
  const [cat, setCat] = useState("inbox");

  const [loginCreds, setLoginCreds] = useState(initLoginCreds);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localToken = decodeJWT(window.localStorage.getItem("jwt"));

    if (!localToken || Date.now() > localToken.exp * 1000) {
      if (window.location.pathname !== "/") setOpen(true);
    } else {
      setCurrUser(localToken.user);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchLetters = async () => {
      const where = (cat, user) => {
        switch (cat) {
          case "inbox":
            return { receiver: user.username };
          case "sent":
            return { sender: user.username };
          case "drafts":
            return { sender: user.username, isDraft: true };
          default:
            return { receiver: user.username };
        }
      };

      const res = await letterApi.get("/letters", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
        },
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

  const login = (e, vals) => {
    if (e) e.preventDefault();

    (async () => {
      if (vals !== initLoginCreds) {
        const res = await user.get("/auth", { params: { user: vals } });

        if (res.status === 200) {
          const { token } = res.data;
          window.localStorage.setItem("jwt", token);
          const { user } = decodeJWT(token);
          setCurrUser(user);
        }
      }
    })();
  };

  const Dash = (props) => <Dashboard {...props} />;
  const Detail = (props) => <LetterDetail {...props} />;

  const Create = (props) => <LetterCreate currUser={currUser} {...props} />;

  const Contact = (props) => <ContactLanding title='Contacts' {...props} />;

  const LandingLogin = (props) => (
    <Login
      setLoginCreds={setLoginCreds}
      loginCreds={loginCreds}
      handleSubmit={login}
      redirect='/dashboard'
      {...props}
    />
  );

  return (
    <div className='ui container'>
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser, setIsLoggedIn }}>
          <SimpleModal
            open={open}
            setOpen={setOpen}
            redirect='/'
            title='Your session has expired'
            content='Your session has ended. In order to continue you must be
        re-authenticated'
          />
          <Switch>
            <Route exact path='/' component={LandingLogin} />
            <>
              <Header />
              <ItemContext.Provider
                value={{ letters, dir, setDir, field, setField, cat, setCat }}>
                <Route path='/dashboard' exact component={Dash} />
                <Route path='/contacts' exact component={Contact} />
                <Route path='/letters/:_id' exact component={Detail} />
              </ItemContext.Provider>
              <Route path='/auth/register' exact component={Register} />
              <Route path='/drafts/new' exact component={Create} />
            </>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
