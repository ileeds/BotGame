import React, { Component } from "react";
import { Button, View, Platform } from "react-native";
import LobbyBody from "../components/LobbyBody";

class Lobby extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Lobby",
      headerLeft: (
        <Button
          title="< Home"
          color="#017BFF"
          onPress={() => navigation.navigate("home")}
        />
      ),
      style: {
        marginTop: Platform.OS === "android" ? 24 : 0
      }
    };
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LobbyBody />
      </View>
    );
  }
}

export default Lobby;
