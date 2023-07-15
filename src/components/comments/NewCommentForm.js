import React, { useEffect, useState } from 'react';

import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [commentInputError, setCommentInputError] = useState(false);
  const [commentInputValue, setCommentInputValue] = useState("");

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComment } = props;


  
  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);



  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({ commentData: { text: commentInputValue }, quoteId: props.quoteId });
  };



  useEffect(()=> {
    const checkInputValidity = () => {
      return (commentInputValue.length > 3);
    };
    setIsButtonDisabled(!checkInputValidity());
  },[commentInputValue]);



  const handleCommentInputChange = (event) => {
    setCommentInputValue(event.target.value);

    if(event.target.value.length > 3)
    {
      setCommentInputError(false);
    }
    else if(event.target.value.length < 4)
    {
      setCommentInputError(true);
      setIsButtonDisabled(true);
    }
  };



  const commentFocusHandler = () => {
    setCommentInputError(true);
  }



  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )}

      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' value={commentInputValue} onFocus={commentFocusHandler} onChange={handleCommentInputChange}></textarea>
        {commentInputError && <p className="error">Comment must be 4 characters long.</p>}
      </div>

      <div className={classes.actions}>
        <button className={`btn ${isButtonDisabled ? "disabled" : ""}`} disabled={isButtonDisabled}>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
