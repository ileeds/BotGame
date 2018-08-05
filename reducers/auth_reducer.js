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
	username: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GETCODE_SUCCESS:
			return { ...state, phone: action.payload };
		case GETCODE_FAIL:
			return { ...state };
		case LOGIN_SUCCESS:
			return { ...state, loggedIn: true };
		case LOGIN_FAIL:
			return { ...state, loggedIn: false };
		case SETUSERNAME_SUCCESS:
			return { ...state, username: action.payload };
		case SETUSERNAME_FAIL:
			return { ...state, username: null };
		default:
			return state;
	}
};
