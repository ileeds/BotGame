import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Header,
  List,
  ListItem,
  Tab,
  Tabs
} from "native-base";
import { CardSection } from "./common";
import FriendItem from "./FriendItem";
import { getNetwork } from "../actions/network_actions";

class FriendsBody extends Component {
  componentDidMount() {
    this.props.getNetwork();
  }

  renderFriends() {
    let toRender = [];
    let friends = this.props.invites["friends"];
    if (friends) {
      for (const [key, value] of Object.entries(friends)) {
        toRender.push(
          <FriendItem key={key} name={value} dbDigit={key} status={"friend"} />
        );
      }
    }
    return toRender;
  }

  renderInvitations() {
    let toRender = [];
    const invites = this.props.invites["received"];
    if (invites) {
      for (const [key, value] of Object.entries(invites)) {
        toRender.push(
          <FriendItem key={key} name={value} dbDigit={key} status={"accept"} />
        );
      }
    }
    return toRender;
  }

  renderSentInvites() {
    let toRender = [];
    const sentInvites = this.props.invites["sent"];
    if (sentInvites) {
      for (const [key, value] of Object.entries(sentInvites)) {
        toRender.push(
          <FriendItem key={key} name={value} dbDigit={key} status={"invited"} />
        );
      }
    }
    return toRender;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <Header style={{ flex: 1 }} hasTabs />
          <Tabs style={{ flex: 10 }}>
            <Tab heading="Friends">
              <Content>
                <List>{this.renderFriends()}</List>
              </Content>
            </Tab>
            <Tab heading="Received Invites">
              <Content>
                <List>{this.renderInvitations()}</List>
              </Content>
            </Tab>
            <Tab heading="Sent Invites">
              <Content>
                <List>{this.renderSentInvites()}</List>
              </Content>
            </Tab>
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

export default connect(
  mapStateToProps,
  { getNetwork }
)(FriendsBody);
