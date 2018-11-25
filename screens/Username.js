import React, { Component } from "react";
import { View } from "react-native";
import UsernameForm from "../components/auth/UsernameForm";

class Username extends Component {
  static navigationOptions = {
    title: "Enter Username",
    headerLeft: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UsernameForm />
      </View>
    );
  }
}

export default Username;
