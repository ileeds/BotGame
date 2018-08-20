import firebase from "../config/firebase";
import axios from "axios";

import {
  GETNETWORK_SUCCESS,
  GETNETWORK_FAIL,
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
        data: { text: "Hi" }
      });
    })
    .then(() => {
      dispatch({ type: SENDINVITE_SUCCESS });
      let updateObject = {
        [`network/${phone}/sent/${phoneTo}`]: nameTo,
        [`network/${phoneTo}/received/${phone}`]: username
      };
      const inviteRef = firebase
        .database()
        .ref()
        .update(updateObject)
        .then(() => {
          dispatch({ type: UPDATEINVITES_SUCCESS });
        })
        .catch(err => {
          dispatch({ type: UPDATEINVITES_FAIL });
        });
    })
    .catch(err => {
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
        console.log(snapshot.val());
        network = snapshot.val();
      }
      dispatch({ type: GETNETWORK_SUCCESS, payload: network });
    })
    .catch(err => {
      dispatch({ type: GETNETWORK_FAIL });
    });
};
