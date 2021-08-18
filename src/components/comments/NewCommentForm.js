import { useEffect, useRef } from 'react';
import usehttp from '../../hooks/use-http'
import { addComment } from '../../lib/api'
import classes from './NewCommentForm.module.css';
import LoadingSpinner from '../UI/LoadingSpinner'

const NewCommentForm = (props) => {
  const { sendRequest, status, error } = usehttp(addComment);
  const commentTextRef = useRef();
  const { onaddedComment } = props;


  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredText = commentTextRef.current.value;
    sendRequest({ commentData: { text: enteredText }, quoteid: props.quoteID })
  };

  useEffect(() => {
    if (status === 'completed' && !error) {
      onaddedComment()
    }

  }, [status, error, onaddedComment])

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === 'pending' &&
        <div className='centered'>
          <LoadingSpinner />
        </div>}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
