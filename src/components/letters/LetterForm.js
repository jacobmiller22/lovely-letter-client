import React, { useState } from "react";

const LetterForm = ({ values, onSubmit }) => {
  const initialVals = values
    ? { ...values, content: "" }
    : { title: "", receiver: "", content: "" };

  const [vals, setVals] = useState(initialVals);

  const handleChange = ({ target }) => {
    let nam = target.name;
    let val = target.value;
    setVals({ ...vals, [nam]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(vals);
  };

  return (
    <div>
      <div className='ui divider'></div>
      <form className='ui form' onSubmit={handleSubmit}>
        <div className='field'>
          <div className='ui labeled input'>
            <div className='ui label'>Title</div>
            <input
              name='title'
              type='text'
              placeholder='Title'
              value={vals.title}
              onChange={handleChange}
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
            />
          </div>
        </div>

        <div className='field'>
          <label>Content</label>
          <div className='ui input'>
            <textarea
              name='content'
              rows={15}
              value={vals.content}
              onChange={handleChange}></textarea>
          </div>
        </div>

        <button className='ui button' type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default LetterForm;
