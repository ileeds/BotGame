import {
	SENDINVITE_SUCCESS,
	SENDINVITE_FAIL,
	UPDATEINVITES_SUCCESS,
	UPDATEINVITES_FAIL
} from '../actions/types';

const INITIAL_STATE = {
	invites: [],
	friends: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATEINVITES_SUCCESS:
			return { ...state, invites: [...state.invites, action.payload] };
		default:
			return state;
	}
};
