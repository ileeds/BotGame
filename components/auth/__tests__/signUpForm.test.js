import React from "react";
import { create } from "react-test-renderer";
import configureStore from "redux-mock-store";
import SignUpForm from "../SignUpForm";
import PhoneInput from "react-native-phone-input";
import ButtonLarge from "../../ButtonLarge";

const mockStore = configureStore();
const initialState = {
  auth: {
    phone: "",
    error: "",
    loading: false
  }
};
const store = mockStore(initialState);

let component, rootInstance;

beforeEach(() => {
  component = create(<SignUpForm store={store} />);
  rootInstance = component.root;
});

it("renders correctly", () => {
  expect(component).toMatchSnapshot();
});

it("has an input and a button", () => {
  expect(rootInstance.findByType(PhoneInput).length).not.toBeNull();
  expect(rootInstance.findByType(ButtonLarge)).not.toBeNull();
});
