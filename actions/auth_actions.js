import firebase from '../config/firebase';
import axios from 'axios';

import {
	GETCODE_SUCCESS,
	GETCODE_FAIL,
	SENDCODE_SUCCESS,
	SENDCODE_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from './types';

const ROOT_URL =
	'https://us-central1-one-time-password-1bd5c.cloudfunctions.net';

export const getCode = phone => async dispatch => {
	try {
		await axios.post(`${ROOT_URL}/newUserOneTimePassword`, { phone });
		dispatch({ type: GETCODE_SUCCESS, payload: phone });
	} catch (err) {
		dispatch({ type: GETCODE_FAIL });
	}
};

export const sendCode = code => async (dispatch, getState) => {
	const { phone } = getState().auth;
	try {
		let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword`, {
			phone,
			code
		});

		firebase.auth().signInWithCustomToken(data.token);
		dispatch({ type: SENDCODE_SUCCESS });
	} catch (err) {
		dispatch({ type: SENDCODE_FAIL });
	}
};

export const verifyAuth = () => dispatch => {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			dispatch({ type: LOGIN_SUCCESS });
		} else {
			dispatch({ type: LOGIN_FAIL });
		}
	});
};

export const anotherCode = () => async (dispatch, getState) => {
	const { phone } = getState().auth;
	try {
		await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone });
		dispatch({ type: GETCODE_SUCCESS, payload: phone });
	} catch (err) {
		dispatch({ type: GETCODE_FAIL });
	}
};

export const setUsername = username => (dispatch, getState) => {
	const { user } = getState().auth;
	user
		.updateProfile({
			username
		})
		.then(() => {
			dispatch({ type: SETUSERNAME_SUCCESS });
		})
		.catch(error => {
			dispatch({ type: SETUSERNAME_FAIL });
		});
};
