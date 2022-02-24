import {useEffect, useRef} from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from "../../hooks/use-http";
import {addComment} from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import {useParams} from "react-router-dom";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
	const {sendRequest, status, error} = useHttp(addComment);
	const { onAddedComment } = props;

	useEffect(() => {
		if (status === 'completed' && !error) {
			// 상위 컴포넌트에 코멘트 추가되었다고 알려줌.
			onAddedComment();
			commentTextRef.current.value = '';
		}
	}, [status, error, onAddedComment, commentTextRef]);


  const submitFormHandler = async (event) => {
    event.preventDefault();

    // optional: Could validate here

    // send comment to server
		await sendRequest({
			commentData: {
				text: commentTextRef.current.value,
			},
			quoteId: props.quoteId,
		})
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
			{status === 'pending' && (
				<div className="centered">
					<LoadingSpinner/>
				</div>
			)}
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
