import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import NavigationService from "../appUtils/NavigationService";
import FriendItem from "./network/FriendItem";
import ButtonLarge from "./ButtonLarge";
import LobbyModal from "./LobbyModal";
import { CardSection } from "./common";
import { backgroundColor } from "../appUtils/puppet";

class LobbyBody extends Component {
  state = {
    showModal: false
  };

  renderFriends() {
    console.log(this.props.online);
    let toRender = [];
    let friends = this.props.invites["friends"];
    let gameInvites = this.props.gameInvites;
    if (friends) {
      for (const [key, value] of Object.entries(friends)) {
        if (gameInvites && Object.keys(gameInvites).includes(key)) {
          toRender.push(
            <FriendItem key={key} name={value} dbDigit={key} status={"wait"} />
          );
        } else {
          toRender.push(
            <FriendItem key={key} name={value} dbDigit={key} status={"add"} />
          );
        }
      }
    }
    return toRender;
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor }}>
        <CardSection style={{ flex: 6 }}>
          <TouchableOpacity
            onPress={() => {
              this.setState({ showModal: true });
            }}
          >
            <Image source={require("../assets/icons8-plus-96.png")} />
          </TouchableOpacity>
        </CardSection>
        <CardSection style={{ flex: 1 }}>
          <ButtonLarge
            text="ADD FRIENDS"
            onPress={() => NavigationService.navigate("inviteFriends")}
          />
        </CardSection>
        <CardSection style={{ flex: 1 }}>
          <ButtonLarge text="START GAME" />
        </CardSection>
        <View style={{ flex: 0.5 }} />
        <LobbyModal
          visible={this.state.showModal}
          onCancel={() => {
            this.setState({ showModal: false });
          }}
        >
          {this.renderFriends()}
        </LobbyModal>
      </View>
    );
  }
}

const mapStateToProps = ({ game, network }) => {
  const { gameInvites } = game;
  const { invites, online } = network;
  return { gameInvites, invites, online };
};

export default connect(mapStateToProps)(LobbyBody);
