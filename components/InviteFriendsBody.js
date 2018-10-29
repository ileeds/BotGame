import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Container, Content, List, ListItem, Text } from "native-base";
import { Contacts } from "expo";
import PhoneInput from "react-native-phone-input";
import { CardSection, Spinner } from "./common";
import FriendItem from "./FriendItem";
import FriendButton from "./FriendButton";
import { invite } from "../actions";

class InviteFriendsBody extends Component {
  state = {
    isReady: false,
    permission: true,
    data: {},
    phone: null
  };

  async componentWillMount() {
    let alphaData = {
      A: [],
      B: [],
      C: [],
      D: [],
      E: [],
      F: [],
      G: [],
      H: [],
      I: [],
      J: [],
      K: [],
      L: [],
      M: [],
      N: [],
      O: [],
      P: [],
      Q: [],
      R: [],
      S: [],
      T: [],
      U: [],
      V: [],
      W: [],
      X: [],
      Y: [],
      Z: []
    };

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers]
    });

    data.map(({ name, phoneNumbers, id }) => {
      if (name && phoneNumbers) {
        const char = name.charAt(0).toUpperCase();
        if (char.match(/[a-z]/i)) {
          alphaData[char].push({
            name,
            id,
            digits: phoneNumbers[0].digits
          });
        }
      }
    });

    for (let val in alphaData) {
      alphaData[val].sort((a, b) => {
        var nameA = a.name;
        var nameB = b.name;
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
      });
    }

    this.setState({ data: alphaData, isReady: true });
  }

  renderContacts() {
    return Object.entries(this.state.data).map(([key, value]) => {
      return this.renderKeyAndValue(key, value);
    });
  }

  renderKeyAndValue(key, value) {
    return (
      <View key={key} style={{ flex: 1 }}>
        <ListItem itemDivider>
          <Text>{key}</Text>
        </ListItem>
        {this.renderFriends(value)}
      </View>
    );
  }

  renderFriends(value) {
    return value.map(contact => {
      const { name, id, digits } = contact;
      const invites = this.props.invites["received"];
      const sentInvites = this.props.invites["sent"];
      const friends = this.props.invites["friends"];
      let dbDigit = String(digits).replace(/[^\d]/g, "");
      dbDigit = dbDigit.length < 11 ? `1${dbDigit}` : dbDigit;

      if (dbDigit.length == 11) {
        if (sentInvites && Object.keys(sentInvites).includes(dbDigit)) {
          return (
            <FriendItem
              key={id}
              name={name}
              dbDigit={dbDigit}
              status={"invited"}
            />
          );
        } else if (invites && Object.keys(invites).includes(dbDigit)) {
          return (
            <FriendItem
              key={id}
              name={name}
              dbDigit={dbDigit}
              status={"accept"}
            />
          );
        } else if (friends && Object.keys(friends).includes(dbDigit)) {
          return (
            <FriendItem
              key={id}
              name={name}
              dbDigit={dbDigit}
              status={"friend"}
            />
          );
        } else {
          return (
            <FriendItem
              key={id}
              name={name}
              dbDigit={dbDigit}
              status={"none"}
            />
          );
        }
      }
    });
  }

  renderBody() {
    toRender = [
      <CardSection style={{ flex: 1, alignSelf: "flex-start" }}>
        <PhoneInput
          onPressFlag={() => {}}
          onChangePhoneNumber={phone => this.setState({ phone })}
          value={this.state.phone}
          textStyle={{ fontSize: 24 }}
          style={{
            position: "relative",
            marginRight: 20,
            marginLeft: 40
          }}
        />
        <FriendButton
          style={{ marginRight: 45 }}
          onPress={() => {
            this.props.invite(
              String(this.state.phone).replace(/[^\d]/g, ""),
              "Unknown"
            );
          }}
          status="invite"
        />
      </CardSection>
    ];
    if (!this.state.isReady) {
      toRender.push(<Spinner size={"large"} style={{ flex: 6 }} />);
      if (!this.state.permission) {
        toRender.push(
          <Text style={{ alignSelf: "center" }}>
            Please go to your privacy settings and allow BotGame to access your
            contacts
          </Text>
        );
      }
      setTimeout(() => {
        this.setState({ permission: false });
      }, 3000);
    } else {
      toRender.push(
        <Container style={{ flex: 6 }}>
          <Content>
            <List>{this.renderContacts()}</List>
          </Content>
        </Container>
      );
    }
    return toRender;
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderBody()}</View>;
  }
}

const mapStateToProps = ({ network }) => {
  const { invites } = network;
  return { invites };
};

export default connect(
  mapStateToProps,
  { invite }
)(InviteFriendsBody);
