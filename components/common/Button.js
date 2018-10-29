import React from "react";
import { TouchableOpacity } from "react-native";

const Button = ({ onPress, children, style }) => {
  const { buttonStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, style]}>
      {children}
    </TouchableOpacity>
  );
};

let styles = {
  buttonStyle: {
    borderRadius: 5,
    borderWidth: 0.1,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: "#4D608B",
    width: 150
  }
};

export { Button };
