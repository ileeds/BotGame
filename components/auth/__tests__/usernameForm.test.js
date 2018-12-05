import React from "react";
import { create } from "react-test-renderer";
import configureStore from "redux-mock-store";
import UsernameForm from "../UsernameForm";

jest.useFakeTimers();

const mockStore = configureStore();
const initialState = {
  auth: {
    error: "",
    loading: false
  }
};
const store = mockStore(initialState);

let component;

beforeEach(() => {
  component = create(<UsernameForm store={store} />);
});

it("renders correctly", () => {
  expect(component).toMatchSnapshot();
});
