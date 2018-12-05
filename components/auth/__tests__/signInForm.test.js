import React from "react";
import { shallow } from "enzyme";
import configureStore from "redux-mock-store";
import { SignInForm } from "../SignInForm";

let props, wrapper;

const initialState = {
  auth: {
    error: "",
    loading: false
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);

beforeEach(() => {
  props = {
    sendCode: jest.fn()
  };

  wrapper = shallow(<SignInForm {...props} />, {
    context: { store: mockStore(initialState) }
  });
});

it("renders correctly", () => {
  expect(wrapper.dive()).toMatchSnapshot();
});

describe("SignInForm", () => {
  it("should render self and subcomponents", () => {
    expect(wrapper.find("#SignInForm").length).toBe(1);
    expect(wrapper.find("#CodeInput").length).toBe(1);
    expect(wrapper.find("#ButtonLarge").length).toBe(1);
  });

  it("should call sendCode on code input fulfill", () => {
    const input = wrapper.find("#CodeInput");
    input.props().onFulfill(1111);
    expect(props.sendCode.mock.calls.length).toBe(1);
  });
});
