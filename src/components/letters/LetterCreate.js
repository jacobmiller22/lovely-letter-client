import React from "react";
import { Link } from "react-router-dom";

import LetterForm from "./LetterForm";

import { getEarlierRoute } from "../../utils";

import lettersApi from "../../apis/letter";

const LetterCreate = ({ location }) => {
  const onSubmit = async (formValues) => {
    const res = await lettersApi.post("/letters", { ...formValues });
    console.log(res);
    // Check response
  };

  const vals =
    location.state && location.state.vals
      ? location.state.vals
      : { title: "", receiver: "", content: "" };

  const route =
    location.state && location.state.prevRoute
      ? location.state.prevRoute
      : getEarlierRoute(location);

  return (
    <div>
      <Link
        to={{ pathname: route, prevRoute: location.pathname }}
        className='ui button '>
        Back
      </Link>
      <span className='ui header'>Compose Letter</span>
      <LetterForm onSubmit={onSubmit} values={vals} />
    </div>
  );
};

export default LetterCreate;
