import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const FriendButton = ({ onPress, status, style }) => {
  switch (status) {
    // invite as friend
    case "invite":
      return (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={[style, styles.containerStyle]}
            source={require("../assets/icons8-invite-96.png")}
          />
        </TouchableOpacity>
      );
    // add to lobby
    case "add":
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[style, styles.textStyle]}>Invite</Text>
        </TouchableOpacity>
      );
    // accept invite as friend
    case "accept":
      return (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={[style, styles.containerStyle]}
            source={require("../assets/icons8-add-user-male-52.png")}
          />
        </TouchableOpacity>
      );
    case "wait":
      return <Text style={{ color: "blue" }}>Sent</Text>;
  }
};

const styles = {
  containerStyle: {
    width: 24,
    height: 24
  },
  textStyle: {
    color: "green"
  }
};

export default FriendButton;
