import {
  AUTH_USER_ACTION,
  GETCODE_SUCCESS,
  GETCODE_FAIL,
  SENDCODE_SUCCESS,
  SENDCODE_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ONLINE_SUCCESS,
  ONLINE_FAIL,
  SETUSERNAME_SUCCESS,
  SETUSERNAME_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  phone: null,
  loggedIn: false,
  username: null,
  error: "",
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // when loading
    case AUTH_USER_ACTION:
      return { ...state, loading: true, error: "" };
    case GETCODE_SUCCESS:
      return { ...state, phone: action.payload, error: "", loading: false };
    case GETCODE_FAIL:
      return {
        ...state,
        error: "Could not get code. Did you enter a valid phone number?",
        loading: false
      };
    case SENDCODE_SUCCESS:
      return { ...state, loading: false };
    case SENDCODE_FAIL:
      return {
        ...state,
        error: "Verification failed. Is the code you entered correct?",
        loading: false
      };
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, error: "" };
    case LOGIN_FAIL:
      return { ...state, loggedIn: false };
    case ONLINE_SUCCESS:
      return state;
    case ONLINE_FAIL:
      return state;
    case SETUSERNAME_SUCCESS:
      return { ...state, username: action.payload, error: "", loading: false };
    case SETUSERNAME_FAIL:
      return {
        ...state,
        username: null,
        error: "Please enter a username",
        loading: false
      };
    default:
      return state;
  }
};
