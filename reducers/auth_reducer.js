import {
	GETCODE_SUCCESS,
	GETCODE_FAIL,
	SENDCODE_SUCCESS,
	SENDCODE_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	phone: null,
	codeSent: false,
	loggedIn: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GETCODE_SUCCESS:
			return { ...state, phone: action.payload, codeSent: true };
		case GETCODE_FAIL:
			return { ...state, codeSent: false };
		case LOGIN_SUCCESS:
			return { ...state, loggedIn: true };
		case LOGIN_FAIL:
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};
