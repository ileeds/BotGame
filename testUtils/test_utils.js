import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import firebase from "../config/firebase";
import reducers from "./test_reducer_index";

const navigation = { navigate: jest.fn(), pop: jest.fn() };

const initialState = {
  auth: {
    phone: null,
    loggedIn: false,
    username: null,
    error: "",
    loading: false
  }
};

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export const initialProps = () => {
  return { navigation, initialState, store };
};

export const updateStore = (key, value) => {
  if (key && value) {
    initialState = {
      ...initialState,
      auth: {
        ...initialState.auth,
        [key]: value
      }
    };
  }

  return createStore(reducers, initialState, applyMiddleware(thunk));
};

export const createTestUser = (numUsers = 1) => {
  let updateObject = {};
  for (let i = 0; i < numUsers; i++) {
    const phone = 1 + i.toString().repeat(10);
    updateObject[phone] = { username: `test${i}`, test: true };
  }
  firebase
    .database()
    .ref("users")
    .update(updateObject);
};
