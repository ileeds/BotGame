import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { Notifications } from "expo";
import { PersistGate } from "redux-persist/lib/integration/react";
import configureStore from "../store";
import { verifyAuth, accept, invite } from "../actions";
import Confirm from "../components/Confirm";
import registerForNotifications from "./push_notifications";

const { persistor, store } = configureStore();

class Root extends Component {
  state = {
    isReady: false,
    text: "",
    phone: "",
    username: "",
    showModal: false
  };

  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      console.log(notification);
      const {
        data: { text, phone, username },
        origin
      } = notification;

      if (origin === "received" && text) {
        this.setState({ text, phone, username, showModal: true });
      }
    });
  }

  onAccept = () => {
    this.setState({ showModal: false });
    store.dispatch(accept(this.state.phone, this.state.username));
  };

  onDecline = () => {
    this.setState({ showModal: false });
  };

  render() {
    store.dispatch(verifyAuth());

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {this.props.children}
          <Confirm
            visible={this.state.showModal}
            onAccept={() => this.onAccept()}
            onDecline={() => this.onDecline()}
          >
            {this.state.text}
          </Confirm>
        </PersistGate>
      </Provider>
    );
  }
}

export default Root;
