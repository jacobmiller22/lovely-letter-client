import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import letters from "../../db/letters";

const LetterDetail = ({ match }) => {
  const [letter, setLetter] = useState(null);

  useEffect(() => {
    letters.forEach((letter) => {
      if (letter.id === match.params.id) {
        setLetter(letter);
      }
    });
  }, [match.params.id]);

  if (!letter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Link to="/" className="ui button">
        Back
      </Link>
      <div className="ui header">{letter.data.title}</div>
      <p>{letter.data.body}</p>
    </div>
  );
};

export default LetterDetail;
