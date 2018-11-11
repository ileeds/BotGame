import React from "react";
import firebase from "../../config/firebase";
import {
  initialProps,
  updateStore,
  createTestUser,
  deleteTestUser
} from "../../testUtils/test_utils";
import { inviteFriend } from "../../actions";

const { navigation, initialState, store } = initialProps();

describe("Invitations", () => {
  it("can send an invitation", async done => {
    const inPhone = "10000000000";
    const outPhone = "11111111111";
    store = updateStore("phone", inPhone);
    store = updateStore("username", "test0");
    createTestUser(2);
    store.dispatch(inviteFriend(outPhone, "test1"));
    const db = firebase.database();
    let data;
    await db.ref(`network/${inPhone}/sent`).once("value", snapshot => {
      data = snapshot.val()[outPhone];
    });
    expect(data).toBe("test1");
    done();
  });
});

afterAll(() => {
  firebase.database().goOffline();
});
