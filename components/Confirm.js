import React from "react";
import { connect } from "redux";
import { Text, View, Modal } from "react-native";
import { CardSection } from "./common";
import ButtonLarge from "./ButtonLarge";

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { cardSectionStyle, textStyle, containerStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>{children}</Text>
        </CardSection>

        <CardSection style={cardSectionStyle}>
          <ButtonLarge onPress={onAccept} text="Accept" />
          <ButtonLarge onPress={onDecline} text="Decline" />
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    flex: 1,
    fontSize: 30,
    textAlign: "center",
    lineHeight: 40,
    color: "white"
  },
  containerStyle: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    position: "relative",
    flex: 1,
    justifyContent: "center"
  }
};

export default Confirm;
