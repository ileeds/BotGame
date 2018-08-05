import {
	GETCODE_SUCCESS,
	GETCODE_FAIL,
	SENDCODE_SUCCESS,
	SENDCODE_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	SETUSERNAME_SUCCESS,
	SETUSERNAME_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	phone: null,
	loggedIn: false,
	username: null,
	error: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GETCODE_SUCCESS:
			return { ...state, phone: action.payload, error: '' };
		case GETCODE_FAIL:
			return {
				...state,
				error: 'Could not get code. Did you enter a valid phone number?'
			};
		case SENDCODE_FAIL:
			return {
				...state,
				error: 'Verification failed. Is the code you entered correct?'
			};
		case LOGIN_SUCCESS:
			return { ...state, loggedIn: true, error: '' };
		case LOGIN_FAIL:
			return { ...state, loggedIn: false };
		case SETUSERNAME_SUCCESS:
			return { ...state, username: action.payload, error: '' };
		case SETUSERNAME_FAIL:
			return { ...state, username: null, error: 'Please enter a username' };
		default:
			return state;
	}
};
