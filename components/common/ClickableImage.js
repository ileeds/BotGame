import React from "react";
import { Image, TouchableOpacity } from "react-native";

const ClickableImage = ({ onPress, style, source }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image style={[style, styles.containerStyle]} source={source} />
    </TouchableOpacity>
  );
};

export { ClickableImage };

const styles = {
  containerStyle: {
    width: 24,
    height: 24
  }
};
