import {
  GETNETWORK_GAME_SUCCESS,
  GETNETWORK_GAME_FAIL,
  SENDINVITE_GAME_SUCCESS,
  SENDINVITE_GAME_FAIL,
  UPDATEINVITES_GAME_SUCCESS,
  UPDATEINVITES_GAME_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  gameInvites: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GETNETWORK_GAME_SUCCESS:
      return { ...state, gameInvites: action.payload };
    default:
      return state;
  }
};
