import React, { Component } from "react";
import { View } from "react-native";
import SignInForm from "../components/auth/SignInForm";

class EnterCode extends Component {
  static navigationOptions = {
    title: "Enter Code",
    headerLeft: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SignInForm />
      </View>
    );
  }
}

export default EnterCode;
