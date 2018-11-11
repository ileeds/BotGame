import firebase from "../config/firebase";
import axios from "axios";

import {
  GETNETWORK_GAME_SUCCESS,
  GETNETWORK_GAME_FAIL,
  SENDINVITE_GAME_SUCCESS,
  SENDINVITE_GAME_FAIL,
  UPDATEINVITES_GAME_SUCCESS,
  UPDATEINVITES_GAME_FAIL
} from "./types";

// invite friend to join game
export const inviteToGame = (phoneTo, nameTo) => (dispatch, getState) => {
  const { phone, username } = getState().auth;
  firebase
    .database()
    .ref(`users/${phoneTo}/pushToken`)
    .once("value", pushToken => {
      sendInvite(pushToken, username);
    })
    .then(() => {
      dispatch({ type: SENDINVITE_GAME_SUCCESS });
      updateInvites(phoneTo)
        .then(() => {
          dispatch({ type: UPDATEINVITES_GAME_SUCCESS });
        })
        .catch(err => {
          console.error(err);
          dispatch({ type: UPDATEINVITES_GAME_FAIL });
        });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: SENDINVITE_GAME_FAIL });
    });
};

// get invites, joined users, etc.
export const getGameNetwork = () => async (dispatch, getState) => {
  const { phone } = getState().auth;
  let invites = [];
  firebase
    .database()
    .ref(`games/${phone}/invites`)
    .on("value", snapshot => {
      if (snapshot.exists()) {
        invites = snapshot.val();
      }
      dispatch({ type: GETNETWORK_GAME_SUCCESS, payload: invites });
    })
    .catch(err => {
      console.error(err);
      dispatch({ type: GETNETWORK_GAME_FAIL });
    });
};

// send push notification to invite to game
sendInvite = async (pushToken, username) => {
  await axios.post("https://exp.host/--/api/v2/push/send", {
    to: snapshot.val(),
    data: {
      text: `${username} has invited you to join a game`,
      phone,
      username
    }
  });
};

// update invites in db
updateInvites = async phoneTo => {
  const gameInvitesRef = firebase.database().ref(`games/${phone}/invites/`);
  const invitesSnapshot = await gameInvitesRef.once("value");
  const invitesValue = invitesSnapshot.exists() ? invitesSnapshot.val() : {};
  const inviteData = { ...invitesValue, [`${phoneTo}`]: false };
  await gameInvitesRef.set(inviteData);
};
