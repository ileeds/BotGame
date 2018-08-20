import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { ListItem, Text } from "native-base";
import { accept, invite } from "../actions/network_actions";
import FriendButton from "./FriendButton";

class FriendsItem extends Component {
  renderIcon() {
    if (this.props.status === "invited") {
      return (
        <Image
          source={require("../assets/icons8-historical-filled-100.png")}
          style={{ width: 24, height: 24 }}
        />
      );
    } else if (this.props.status === "accept") {
      return (
        <FriendButton
          onPress={() => {
            this.props.accept(this.props.dbDigit, this.props.name);
          }}
          status="accept"
        />
      );
    } else if (this.props.status === "friend") {
      return (
        <Image
          source={require("../assets/icons8-friends-96.png")}
          style={{ width: 24, height: 24 }}
        />
      );
    } else {
      return (
        <FriendButton
          onPress={() => {
            this.props.invite(this.props.dbDigit, this.props.name);
          }}
          status="invite"
        />
      );
    }
  }

  render() {
    return (
      <ListItem style={{ flex: 1 }}>
        <Text style={{ flex: 1 }}>{this.props.name}</Text>
        <Text style={{ flex: 1 }}>{this.props.dbDigit}</Text>
        {this.renderIcon()}
      </ListItem>
    );
  }
}

export default connect(
  null,
  { accept, invite }
)(FriendsItem);
