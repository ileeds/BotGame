import React, { Component } from "react";
import { View } from "react-native";
import SignUpForm from "../components/auth/SignUpForm";

class GetCode extends Component {
  static navigationOptions = {
    title: "Enter Phone",
    headerLeft: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignUpForm />
      </View>
    );
  }
}

export default GetCode;
