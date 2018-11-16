import firebase from "../config/firebase";
import axios from "axios";
import { AsyncStorage } from "react-native";
import NavigationService from "../appUtils/NavigationService";

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
} from "./types";
import { ROOT_URL } from "../appUtils/puppet";

// check if user is logged in
export const verifyAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch({ type: LOGIN_SUCCESS });
    } else {
      dispatch({ type: LOGIN_FAIL });
    }
  });
};

// get one time code for sign in
export const getCode = phone => async (dispatch, getState) => {
  dispatch({ type: AUTH_USER_ACTION });
  const statePhone = getState().auth.phone;
  if (statePhone == phone) {
    return retrieveCode("/requestOneTimePassword", statePhone, dispatch);
  }

  return retrieveCode("/newUserOneTimePassword", phone, dispatch);
};

// send one time code
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
    NavigationService.navigate("username");
  } catch (err) {
    console.log(err);
    dispatch({ type: SENDCODE_FAIL });
  }
};

// set username during sign in
export const setUsername = username => async (dispatch, getState) => {
  dispatch({ type: AUTH_USER_ACTION });
  if (!username) {
    return dispatch({ type: SETUSERNAME_FAIL });
  }
  const { phone } = getState().auth;
  const pushToken = await AsyncStorage.getItem("push_token");
  firebase
    .database()
    .ref(`users/${phone}`)
    .update({ username, pushToken })
    .then(() => {
      dispatch({ type: SETUSERNAME_SUCCESS, payload: username });
      NavigationService.navigate("home");
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SETUSERNAME_FAIL });
    });
};

// set online or offline
export const online = state => async (dispatch, getState) => {
  const { phone } = getState().auth;
  firebase
    .database()
    .ref(`users/${phone}`)
    .update({ online: state })
    .then(() => {
      dispatch({ type: ONLINE_SUCCESS });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: ONLINE_FAIL });
    });
};

// private method - get one time code
retrieveCode = async (path, phone, dispatch) => {
  try {
    await axios.post(`${ROOT_URL}${path}`, { phone });
    dispatch({ type: GETCODE_SUCCESS, payload: phone });
    NavigationService.navigate("enterCode");
  } catch (err) {
    console.log(err);
    dispatch({ type: GETCODE_FAIL });
  }
};
