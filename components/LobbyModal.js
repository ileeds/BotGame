import React from "react";
import { View, Modal, Image, TouchableOpacity } from "react-native";
import { Container, Content, List } from "native-base";
import { CardSection } from "./common";

const LobbyModal = ({ children, visible, onCancel }) => {
  const { cardSectionStyle, containerStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity onPress={onCancel}>
            <Image
              style={{ height: 20, width: 20, marginRight: 20 }}
              source={require("../assets/icons8-cancel-100.png")}
            />
          </TouchableOpacity>
        </CardSection>
        <CardSection style={cardSectionStyle}>
          <Container style={{ flex: 1, height: "100%" }}>
            <Content>
              <List>{children}</List>
            </Content>
          </Container>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: "center",
    flex: 20
  },
  containerStyle: {
    backgroundColor: "white",
    position: "relative",
    flex: 1,
    justifyContent: "center",
    marginTop: 30
  }
};

export default LobbyModal;
