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

// accept friend invite
export const acceptFriend = (phoneTo, nameTo) => (dispatch, getState) => {
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

// send friend invite
export const inviteFriend = (phoneTo, nameTo) => (dispatch, getState) => {
  const { phone, username } = getState().auth;
  let val;
  firebase
    .database()
    .ref(`users/${phoneTo}/pushToken`)
    .once("value", async snapshot => {
      val = snapshot.val();
      if (null != val) {
        sendPushNotification(val, username, phone);
      }
    })
    .then(() => {
      if (null != val) {
        dispatch({ type: SENDINVITE_SUCCESS });
        updateInvites(phone, phoneTo, nameTo, username)
          .then(() => {
            dispatch({ type: UPDATEINVITES_SUCCESS });
          })
          .catch(err => {
            console.error(err);
            dispatch({ type: UPDATEINVITES_FAIL });
          });
      } else {
        dispatch({ type: SENDINVITE_FAIL });
      }
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SENDINVITE_FAIL });
    });
};

// get invites, friends, etc.
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
      dispatch(getOnlineStatus());
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: GETNETWORK_FAIL });
    });
};

// TODO: Investigate
// see who in network is online
getOnlineStatus = () => async (dispatch, getState) => {
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

// send push notification to invited user
sendPushNotification = async (val, username, phone) => {
  await axios.post("https://exp.host/--/api/v2/push/send", {
    to: val,
    title: "Chattle Notification",
    data: {
      text: `${username} has sent you a friend invitation`,
      phone,
      username
    }
  });
};

// update invites in db
updateInvites = async (phone, phoneTo, nameTo, username) => {
  let updateObject = {
    [`network/${phone}/sent/${phoneTo}`]: nameTo,
    [`network/${phoneTo}/received/${phone}`]: username
  };
  firebase
    .database()
    .ref()
    .update(updateObject);
};
