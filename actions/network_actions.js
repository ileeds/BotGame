import firebase from "../config/firebase";
import axios from "axios";

import {
  GETNETWORK_SUCCESS,
  GETNETWORK_FAIL,
  GETONLINE_SUCCESS,
  GETONLINE_FAIL,
  SENDINVITE_SUCCESS,
  SENDINVITE_FAIL,
  UPDATEINVITES_SUCCESS,
  UPDATEINVITES_FAIL,
  UPDATENETWORK_SUCCESS,
  UPDATENETWORK_FAIL
} from "./types";

export const accept = (phoneTo, nameTo) => (dispatch, getState) => {
  const { phone, username } = getState().auth;
  let updateObject = {
    [`network/${phone}/received/${phoneTo}`]: null,
    [`network/${phoneTo}/sent/${phone}`]: null,
    [`network/${phone}/friends/${phoneTo}`]: nameTo,
    [`network/${phoneTo}/friends/${phone}`]: username
  };
  firebase
    .database()
    .ref()
    .update(updateObject)
    .then(() => {
      dispatch({ type: UPDATENETWORK_SUCCESS });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: UPDATENETWORK_FAIL });
    });
};

export const invite = (phoneTo, nameTo) => (dispatch, getState) => {
  const { phone, username } = getState().auth;
  firebase
    .database()
    .ref(`users/${phoneTo}/pushToken`)
    .once("value", async snapshot => {
      await axios.post("https://exp.host/--/api/v2/push/send", {
        to: snapshot.val(),
        data: {
          text: `${username} has sent you a friend invitation`,
          phone,
          username
        }
      });
    })
    .then(() => {
      dispatch({ type: SENDINVITE_SUCCESS });
      let updateObject = {
        [`network/${phone}/sent/${phoneTo}`]: nameTo,
        [`network/${phoneTo}/received/${phone}`]: username
      };
      firebase
        .database()
        .ref()
        .update(updateObject)
        .then(() => {
          dispatch({ type: UPDATEINVITES_SUCCESS });
        })
        .catch(err => {
          console.error(err);
          dispatch({ type: UPDATEINVITES_FAIL });
        });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SENDINVITE_FAIL });
    });
};

export const getNetwork = () => async (dispatch, getState) => {
  const { phone } = getState().auth;
  let network = [];
  firebase
    .database()
    .ref(`network/${phone}`)
    .on("value", snapshot => {
      if (snapshot.exists()) {
        network = snapshot.val();
      }
      dispatch({ type: GETNETWORK_SUCCESS, payload: network });
      dispatch(getOnline());
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: GETNETWORK_FAIL });
    });
};

export const getOnline = () => async (dispatch, getState) => {
  const { invites } = getState().network;
  for (const [key, value] of Object.entries(invites)) {
    const number = Object.keys(value);
    firebase
      .database()
      .ref(`users/${number}/online`)
      .on("value", snapshot => {
        dispatch({
          type: GETONLINE_SUCCESS,
          payload: { [number]: snapshot.val() }
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: GETONLINE_FAIL });
      });
  }
};
