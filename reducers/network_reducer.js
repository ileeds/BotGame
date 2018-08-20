import { showMessage } from "react-native-flash-message";

import {
  GETNETWORK_SUCCESS,
  GETNETWORK_FAIL,
  SENDINVITE_SUCCESS,
  SENDINVITE_FAIL,
  UPDATEINVITES_SUCCESS,
  UPDATEINVITES_FAIL,
  UPDATENETWORK_SUCCESS,
  UPDATENETWORK_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  invites: [],
  friends: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATEINVITES_SUCCESS:
      showMessage({
        message: "Invitation sent",
        type: "info"
      });
      return state;
    case GETNETWORK_SUCCESS:
      return { ...state, invites: action.payload };
    default:
      return state;
  }
};
