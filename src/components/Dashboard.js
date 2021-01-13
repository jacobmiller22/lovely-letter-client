import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";

import LetterLanding from "./letters/LetterLanding";

import "./Dashboard.css";

const Dashboard = (props) => {
  const { location } = props;

  const initialValues = { title: "", receiver: "", content: "" };
  const [vals, setVals] = useState(initialValues);

  const User = useContext(UserContext);

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const Landing = () => <LetterLanding title='Letters' {...props} />;

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
    if (User.currUser) {
      return (
        <div className='ui center aligned header'>
          Welcome, {User.currUser.username}!
        </div>
      );
    }
  };

  return (
    <div>
      <div className='ui two column very relaxed stackable grid'>
        <div className='column'>
          {renderAuth()}

          <span>
            <i className='ui very large icons bar'>
              <i className='bell icon'></i>
              <div className='floating ui tiny red circular label'>1</div>
            </i>
            <i className='ui very large icons bar'>
              <i className='bell icon'></i>
              <div className='floating ui tiny red circular label'>1</div>
            </i>
          </span>
          <div id='dash-content' className='ui content'>
            <div className='ui medium header'>Updates</div>
            <div className='ui description'>
              Update details will be given here!
            </div>
          </div>
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
