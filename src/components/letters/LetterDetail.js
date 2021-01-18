import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { backRoute } from "../../utils";
import ItemContext from "../../contexts/ItemContext";

import "./LetterDetail.css";

const LetterDetail = ({ match, location }) => {
  const [letter, setLetter] = useState(null);

  const Item = useContext(ItemContext);

  useEffect(() => {
    Item.letters.forEach((letter) => {
      if (letter._id === match.params._id) {
        setLetter(letter);
      }
    });
  }, [Item.letters, match]);

  const renderContent = () => {
    if (!letter) {
      return (
        <div className='ui fluid placeholder'>
          <div className='header'>
            <div className='line'></div>
            <div className='line'></div>
          </div>
          <div className='paragraph'>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </div>
      );
    }
    return (
      <div className='ui content'>
        <h1 className='ui header'>
          {letter.title}
          <div className='ui sub header'>{letter._sender.username}</div>
        </h1>

        <p>{letter.content}</p>
      </div>
    );
  };

  return (
    <div className='ui container'>
      <Link
        to={{ pathname: backRoute(location), prevRoute: location.pathname }}
        className='ui button'
        id='back-button'>
        Back
      </Link>
      <div className='ui very padded raised segment'>{renderContent()}</div>
    </div>
  );
};

export default LetterDetail;
