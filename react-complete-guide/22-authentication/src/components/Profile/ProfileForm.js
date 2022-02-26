import classes from './ProfileForm.module.css';
import {useContext, useRef} from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);

	const submitHandler = async e => {
		e.preventDefault();

		// change password
		// https://firebase.google.com/docs/reference/rest/auth#section-change-password
		const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBB9cTkT4hgho6EG6jS1c5Z5rgn67LB6es'

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				idToken: authCtx.token,
				password: newPasswordInputRef.current.value,
				returnSecureToken: false,
			})
		});

		const json = response.json();

		// todo 응답값에 따른 피드백 주기
	}

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
					ref={newPasswordInputRef}
					minLength={7}  // 최소 7글자
					type='password'
					id='new-password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
