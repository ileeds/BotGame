import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react-native";
import { ListItem, Text } from "native-base";
import { inviteToGame, acceptFriend, inviteFriend } from "../actions";
import FriendButton from "./FriendButton";

class FriendsItem extends Component {
  renderIcon() {
    switch (this.props.status) {
      case "invited":
        return (
          <Image
            source={require("../assets/icons8-historical-filled-100.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      case "accept":
        return (
          <FriendButton
            onPress={() => {
              this.props.acceptFriend(this.props.dbDigit, this.props.name);
            }}
            status="accept"
          />
        );
      case "friend":
        return (
          <Image
            source={require("../assets/icons8-friends-96.png")}
            style={{ width: 24, height: 24 }}
          />
        );
      case "add":
        return (
          <FriendButton
            onPress={() => {
              this.props.inviteToGame(this.props.dbDigit, this.props.name);
            }}
            status="add"
            online={true}
          />
        );
      case "wait":
        return <FriendButton status="wait" online={true} />;
      default:
        return (
          <FriendButton
            onPress={() => {
              this.props.inviteFriend(this.props.dbDigit, this.props.name);
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
  { inviteToGame, acceptFriend, inviteFriend }
)(FriendsItem);
