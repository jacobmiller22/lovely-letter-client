import React, { useEffect, useState } from "react";

import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Header from "./Views/Header";
import Dashboard from "./Views/Dashboard";
import ComposeView from "./Views/ComposeView";
import LettersListView from "./Views/LettersListView";
import DetailView from "./Views/DetailView";
import AuthView from "./Views/AuthView";

import ModalBuilder from "./components/ModalBuilder";
import LoginPanel from "./components/user/auth/LoginPanel";
import ResetPanel from "./components/user/auth/ResetPanel";
import RegisterPanel from "./components/user/auth/RegisterPanel";
// import ContactsListView from "./Views/ContactsListView";

// import Register from "./components/user/auth/Register";
// import LetterDetail from "./components/letters/LetterDetail";
// import LetterCreate from "./components/letters/LetterCreate";
// import SimpleModal from "./components/modals/SimpleModal";
// import ContactLanding from "./components/contacts/ContactLanding";
// import LandingLogin from "./components/user/auth/LandingLogin";
// import LandingReset from "./components/user/auth/LandingReset";
// import UserProfile from "./components/user/profile/UserProfile";

import UserContext from "./contexts/UserContext";

import { decodeJWT, routeRequiresAuth } from "./utils";

const App = (props) => {
  const [currUser, setCurrUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, checkLogin] = useState({});

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
  }, [isLoggedIn, checking]);

  useEffect(() => {
    setInterval(() => {
      checkLogin({});
    }, 30 * 60 * 1000);
  });

  const authButton = (
    <Link
      key="ok"
      to={{ pathname: "/" }}
      className="ui button"
      onClick={() => setOpen(false)}
    >
      Ok
    </Link>
  );

  const modalCfg = {
    title: "Your session has expired",
    open,
    handleClose: () => setOpen(false),
    body:
      "Your session has ended. In order to continue you must be re-authenticated",
    actions: [authButton],
  };

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{ currUser, setCurrUser, setIsLoggedIn }}>
          <ModalBuilder config={modalCfg} />
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <AuthView>
                  <LoginPanel />
                </AuthView>
              )}
            />
            <Route
              exact
              path="/auth/reset"
              component={() => (
                <AuthView>
                  <ResetPanel initStage={1} />
                </AuthView>
              )}
            />
            <Route
              exact
              path="/auth/reset/:_id"
              component={() => (
                <AuthView>
                  <ResetPanel initStage={2} />
                </AuthView>
              )}
            />
            <Route
              path="/auth/register"
              exact
              component={() => (
                <AuthView>
                  <RegisterPanel />
                </AuthView>
              )}
            />

            <>
              <Header />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/letters" exact component={LettersListView} />
              <Route path="/contacts" exact component={LettersListView} />
              <Route path="/letters/:_id" exact component={DetailView} />

              {/* <Route path="/profile" exact component={UserProfile} /> */}
              {/* <Route path="/contacts" exact component={Contact} /> */}
              <Route path="/drafts/new" exact component={ComposeView} />
            </>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
