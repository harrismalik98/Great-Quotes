import React, { Fragment, useEffect, useState } from 'react';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {

  const [authorInputValue, setAuthorInputValue] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [authorInputError, setAuthorInpurError] = useState(false);
  const [textInputError, setTextInpurError] = useState(false);



  const submitFormHandler = (event) => {
    event.preventDefault();

    props.onAddQuote({ author: authorInputValue, text: textInputValue });
  };



  useEffect(()=> {
    const checkInputValidity = () => {
      return (authorInputValue.length > 1 && textInputValue.length > 11);
    };
    setIsButtonDisabled(!checkInputValidity());

  },[authorInputValue,textInputValue]);



  const handleAuthorInputChange = (event) => {
    setAuthorInputValue(event.target.value);

    if(event.target.value.length > 1)
    {
      setAuthorInpurError(false);
    }
    else if(event.target.value.length < 2)
    {
      setAuthorInpurError(true);
      setIsButtonDisabled(true);
    }

  };

  const handleTextInputChange = (event) => {
    setTextInputValue(event.target.value);

    if(event.target.value.length > 11)
    {
      setTextInpurError(false);
    }
    else if(event.target.value.length < 12)
    {
      setTextInpurError(true);
      setIsButtonDisabled(true);
    }

  };



  const authorFocusHandler = () => {
    setAuthorInpurError(true);
  }

  const quoteFocusHandler = () => {
    setTextInpurError(true);
  }

  return (
    <Fragment>
      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor='author'>Author</label>
            <input type='text' id='author' onFocus={authorFocusHandler} value={authorInputValue} onChange={handleAuthorInputChange}/>
            {authorInputError && <p className="error">Author name must be 2 characters long.</p>}
          </div>
          

          <div className={classes.control}>
            <label htmlFor='text'>Text</label>
            <textarea id='text' rows='5' onFocus={quoteFocusHandler} value={textInputValue} onChange={handleTextInputChange} />
            {textInputError && <p className="error">Quote must be 12 characters long.</p>}
          </div>


          <div className={classes.actions}>
            <button className={`btn ${isButtonDisabled ? "disabled" : ""}`} disabled={isButtonDisabled}>Add Quote</button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;