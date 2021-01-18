import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Header from "./Header";
import Dashboard from "./Dashboard";
import Register from "./user/auth/Register";
import LetterDetail from "./letters/LetterDetail";
import LetterCreate from "./letters/LetterCreate";
import SimpleModal from "./modals/SimpleModal";
import ContactLanding from "./contacts/ContactLanding";
import LandingLogin from "./user/auth/LandingLogin";
import LandingReset from "./user/auth/LandingReset";
import UserProfile from "./user/profile/UserProfile";

import letterApi from "../apis/letter";

import UserContext from "../contexts/UserContext";
import ItemContext from "../contexts/ItemContext";

import { decodeJWT, routeRequiresAuth } from "../utils";

const App = (props) => {
  const [letters, setLetters] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dir, setDir] = useState("DESC");
  const [field, setField] = useState("dateSent");
  const [cat, setCat] = useState("inbox");
  const [isLoading, setIsLoading] = useState(true);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localToken = decodeJWT(window.localStorage.getItem("jwt"));

    if (
      routeRequiresAuth(window) &&
      (!localToken || Date.now() > localToken.exp * 1000)
    ) {
      setOpen(true);
    } else {
      if (localToken) setCurrUser(localToken.user);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const fetchLetters = async () => {
      const where = (cat, user) => {
        switch (cat) {
          case "inbox":
            return { _receiver: user.username };
          case "sent":
            return { _sender: user.username, isDraft: false };
          case "drafts":
            return { _sender: user.username, isDraft: true };
          default:
            return { _receiver: user.username };
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

  const Dash = (props) => <Dashboard {...props} />;

  const Detail = (props) => <LetterDetail {...props} />;

  const Create = (props) => <LetterCreate currUser={currUser} {...props} />;

  const Contact = (props) => <ContactLanding title='Contacts' {...props} />;

  const authButton = (
    <Link key='ok' to='/' className='ui button' onClick={() => setOpen(false)}>
      Ok
    </Link>
  );

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser, setIsLoggedIn }}>
          <SimpleModal
            open={open}
            setOpen={setOpen}
            title='Your session has expired'
            content='Your session has ended. In order to continue you must be
        re-authenticated'
            actions={[authButton]}
          />
          <Switch>
            <Route exact path='/' component={LandingLogin} />
            <Route exact path='/auth/reset' component={LandingReset} />
            <>
              <Header />
              <ItemContext.Provider
                value={{
                  letters,
                  dir,
                  setDir,
                  field,
                  setField,
                  cat,
                  setCat,
                  isLoading,
                  setIsLoading,
                }}>
                <Route path='/profile' exact component={UserProfile} />
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
