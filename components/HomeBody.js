import React, { Component } from "react";
import { AppState, View, Image } from "react-native";
import { connect } from "react-redux";
import NavigationService from "../appUtils/NavigationService";
import ButtonLarge from "./ButtonLarge";
import { CardSection } from "./common";
import { backgroundColor } from "../appUtils/puppet";
import { online, getNetwork, getGameNetwork } from "../actions";

class HomeBody extends Component {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    if (AppState.currentState === "active") {
      this.props.online(true);
    }
    AppState.addEventListener("change", this.handleAppStateChange);
    this.props.getNetwork();
    this.props.getGameNetwork();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.props.online(true);
    } else {
      this.props.online(false);
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    const {
      logoContainerStyle,
      imageStyle,
      availableContainerStyle,
      unavailableContainerStyle,
      donateContainerStyle
    } = styles;

    return (
      <View style={{ flex: 1, backgroundColor }}>
        <CardSection style={logoContainerStyle}>
          <Image style={imageStyle} source={require("../assets/logo.png")} />
        </CardSection>
        <CardSection style={availableContainerStyle}>
          <ButtonLarge
            onPress={() => NavigationService.navigate("lobby")}
            text="PLAY WITH FRIENDS"
          />
        </CardSection>
        <CardSection style={unavailableContainerStyle}>
          <ButtonLarge text="RANDOM GAME" />
        </CardSection>
        <CardSection style={donateContainerStyle}>
          <ButtonLarge text="DONATE" />
        </CardSection>
        <View style={{ flex: 0.5, backgroundColor }} />
      </View>
    );
  }
}

const styles = {
  logoContainerStyle: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  imageStyle: { width: 200, height: 200 },
  availableContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  unavailableContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  donateContainerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export default connect(
  null,
  { online, getNetwork, getGameNetwork }
)(HomeBody);
