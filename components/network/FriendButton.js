import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { ClickableImage } from "../common";

const FriendButton = ({ onPress, status, style }) => {
  switch (status) {
    // invite to network
    case "invite":
      return (
        <ClickableImage
          onPress={onPress}
          style={style}
          source={require("../../assets/icons8-invite-96.png")}
        />
      );
    // add to game
    case "add":
      return (
        <TouchableOpacity onPress={onPress}>
          <Text style={[style, styles.textStyle]}>Invite</Text>
        </TouchableOpacity>
      );
    // accept invite as friend
    case "accept":
      return (
        <ClickableImage
          onPress={onPress}
          style={style}
          source={require("../../assets/icons8-add-user-male-52.png")}
        />
      );
    // invite to game sent
    case "wait":
      return <Text style={{ color: "blue" }}>Sent</Text>;
  }
};

const styles = {
  textStyle: {
    color: "green"
  }
};

export default FriendButton;
