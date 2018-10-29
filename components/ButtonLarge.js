import React from "react";
import { Text } from "react-native";
import { Button } from "./common";

const ButtonLarge = ({ onPress, text }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <Button style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{text}</Text>
    </Button>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    height: 50
  },
  textStyle: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold"
  }
};

export default ButtonLarge;
