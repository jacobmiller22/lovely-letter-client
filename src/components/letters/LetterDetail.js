import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEarlierRoute } from "../../utils";

import "./LetterDetail.css";

const LetterDetail = ({ letters, match, location }) => {
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    letters.forEach((letter) => {
      if (letter._id === match.params._id) {
        setLetter(letter);
      }
    });
  }, [letters, match]);

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
      <>
        <div className='ui header'>{letter.title}</div>
        <p>{letter.content}</p>
      </>
    );
  };

  return (
    <div>
      <Link
        to={getEarlierRoute(location)}
        className='ui button'
        id='back-button'>
        Back
      </Link>
      <div className='ui very padded raised segment'>{renderContent()}</div>
    </div>
  );
};

export default LetterDetail;
