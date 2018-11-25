import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { Container, Header, ListItem, Tabs } from "native-base";
import { CardSection, TabSection } from "../common";
import FriendItem from "./FriendItem";

class FriendsBody extends Component {
  renderUtil(inviteType, friendItemType) {
    let toRender = [];
    const networkItems = this.props.invites[inviteType];
    if (networkItems) {
      for (const [key, value] of Object.entries(networkItems)) {
        toRender.push(
          <FriendItem
            key={key}
            name={value}
            dbDigit={key}
            status={friendItemType}
          />
        );
      }
    }
    return toRender;
  }

  renderInvitations() {
    return this.renderUtil("received", "accept");
  }

  renderFriends() {
    return this.renderUtil("friends", "friend");
  }

  renderSentInvites() {
    return this.renderUtil("sent", "invited");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <Header style={{ flex: 1 }} hasTabs />
          <Tabs style={{ flex: 10 }}>
            <TabSection
              heading="Received Invites"
              renderFunction={() => this.renderInvitations()}
            />
            <TabSection
              heading="Friends"
              renderFunction={() => this.renderFriends()}
            />
            <TabSection
              heading="Sent Invites"
              renderFunction={() => this.renderSentInvites()}
            />
          </Tabs>
        </Container>
      </View>
    );
  }
}

const mapStateToProps = ({ network }) => {
  const { invites } = network;
  return { invites };
};

export default connect(mapStateToProps)(FriendsBody);
