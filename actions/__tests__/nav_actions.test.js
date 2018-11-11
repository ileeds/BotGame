import React from "react";
import { initialProps, updateStore } from "../../testUtils/test_utils";
import { getInitialScreen } from "../../actions";
import NavigationService from "../../appUtils/NavigationService";

const { navigation, initialState, store } = initialProps();

describe("Get initial screen", () => {
  it("can get intial screen", () => {
    const dispatch = jest.fn();
    const spy = jest
      .spyOn(NavigationService, "navigate")
      .mockImplementation(() => {
        return {
          dispatch
        };
      });
    store.dispatch(getInitialScreen());
    expect(spy.mock.calls[0][0]).toBe("getCode");
    store = updateStore("phone", "111-111-1111");
    store.dispatch(getInitialScreen());
    expect(spy.mock.calls[1][0]).toBe("enterCode");
    store = updateStore("loggedIn", true);
    store.dispatch(getInitialScreen());
    expect(spy.mock.calls[2][0]).toBe("username");
    store = updateStore("username", "user123");
    store.dispatch(getInitialScreen());
    expect(spy.mock.calls[3][0]).toBe("home");
  });
});
