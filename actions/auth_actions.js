import firebase from '../config/firebase';
import axios from 'axios';

import {
	AUTH_USER_ACTION,
	GETCODE_SUCCESS,
	GETCODE_FAIL,
	SENDCODE_SUCCESS,
	SENDCODE_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SETUSERNAME_SUCCESS,
	SETUSERNAME_FAIL
} from './types';
import { ROOT_URL } from '../appUtils/puppet';

export const verifyAuth = () => dispatch => {
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			dispatch({ type: LOGIN_SUCCESS });
		} else {
			dispatch({ type: LOGIN_FAIL });
		}
	});
};

export const getCode = phone => async dispatch => {
	dispatch({ type: AUTH_USER_ACTION });
	return retrieveCode('/newUserOneTimePassword', phone, dispatch);
};

export const anotherCode = () => async (dispatch, getState) => {
	dispatch({ type: AUTH_USER_ACTION });
	const { phone } = getState().auth;
	return retrieveCode('/requestOneTimePassword', phone, dispatch);
};

export const sendCode = code => async (dispatch, getState) => {
	dispatch({ type: AUTH_USER_ACTION });
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

export const setUsername = username => dispatch => {
	dispatch({ type: AUTH_USER_ACTION });
	if (!username) {
		return dispatch({ type: SETUSERNAME_FAIL });
	}
	const user = firebase.auth().currentUser;
	user
		.updateProfile({
			username
		})
		.then(() => {
			dispatch({ type: SETUSERNAME_SUCCESS, payload: username });
		})
		.catch(err => {
			dispatch({ type: SETUSERNAME_FAIL });
		});
};

retrieveCode = async (path, phone, dispatch) => {
	try {
		await axios.post(`${ROOT_URL}${path}`, { phone });
		dispatch({ type: GETCODE_SUCCESS, payload: phone });
	} catch (err) {
		dispatch({ type: GETCODE_FAIL });
	}
};
