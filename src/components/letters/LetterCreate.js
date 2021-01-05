import React from "react";
import { Link } from "react-router-dom";

import LetterForm from "./LetterForm";

import { getEarlierRoute } from "../../utils";

import lettersApi from "../../apis/letter";

const LetterCreate = ({ location, currUser, history }) => {
  const onSubmit = async (formValues) => {
    const auth = {
      Authorization: `Bearer ${window.localStorage.getItem("jwt")}`,
    };

    const formData = { ...formValues, sender: currUser.username };
    console.log(formData);
    const res = await lettersApi.post(
      "/letters",
      {
        ...formData,
      },
      { headers: { ...auth } }
    );

    if (res.status === 200) {
      history.push("/");
    } else {
      // Show error message - Oops something went wrong.
    }
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
