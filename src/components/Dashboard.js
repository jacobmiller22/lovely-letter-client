import React, { useState } from "react";
import { Link } from "react-router-dom";
import LetterLanding from "./letters/LetterLanding";

import "./Dashboard.css";
import Login from "./auth/Login";

const Dashboard = ({ letters, location, currUser, setCurrUser }) => {
  const initialValues = { title: "", receiver: "", content: "" };
  const [vals, setVals] = useState(initialValues);

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const Landing = () => <LetterLanding letters={letters} title='Letters' />;

  const NewLetter = () => {
    return (
      <form className='ui form' onSubmit={handleChange}>
        <div className='field'>
          <div className='ui labeled input'>
            <div className='ui label'>Title:</div>
            <input
              name='title'
              type='text'
              placeholder='Title'
              value={vals.title}
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
        </div>

        <div className='field'>
          <div className='ui labeled input'>
            <div className='ui label'>Recipient:</div>
            <input
              name='receiver'
              type='text'
              placeholder='Recipient'
              value={vals.receiver}
              onChange={handleChange}
              autoComplete='off'
            />
          </div>
        </div>
        <div>
          <Link
            to={{
              pathname: "/drafts/new",
              state: {
                vals,
                prevRoute: location.pathname,
              },
            }}
            className='ui button'>
            Compose
          </Link>
        </div>
      </form>
    );
  };

  const renderAuth = () => {
    if (currUser) {
      return null;
    } else {
      return <Login currUser={currUser} setCurrUser={setCurrUser} />;
    }
  };

  return (
    <div>
      <div className='ui two column very relaxed stackable grid'>
        <div className='column'>
          {renderAuth()}
          <div className='ui divider'></div>
          <span>
            <i className='ui very large icons'>
              <i className='bell icon'></i>
              <div className='floating ui tiny red circular label'>1</div>
            </i>
          </span>
          <div>News?</div>
        </div>
        <div className='column'>
          {NewLetter()}
          <div className='ui divider'></div>
          {Landing()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
