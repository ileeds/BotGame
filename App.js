import React, { Component } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Asset, AppLoading } from "expo";
import FlashMessage from "react-native-flash-message";
import MainNavigator from "./appUtils/MainNavigator";
import Root from "./appUtils/Root";

export default class App extends Component {
  state = {
    isReady: false
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Root>
        <View style={styles.container}>
          <MainNavigator />
        </View>
        <FlashMessage position="top" />
      </Root>
    );
  }

  async _cacheResourcesAsync() {
    const images = [
      require("./assets/logo.png"),
      require("./assets/icons8-add-user-male-52.png"),
      require("./assets/icons8-historical-filled-100.png"),
      require("./assets/icons8-invite-96.png"),
      require("./assets/icons8-friends-96.png"),
      require("./assets/icons8-plus-96.png"),
      require("./assets/icons8-cancel-100.png")
    ];

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around"
  }
});
