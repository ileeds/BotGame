import React from "react";
import { TextInput, View } from "react-native";

const Input = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType
}) => {
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoFocus
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "black",
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 36,
    lineHeight: 40,
    flex: 2,
    letterSpacing: 2
  },
  containerStyle: {
    height: 80,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#CBC9CE",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
    borderWidth: 0.1
  }
};

export { Input };
