import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import CodeInput from "react-native-confirmation-code-input";
import { sendCode } from "../../actions";
import { renderErrorAndLoading } from "../../appUtils/renderFunctions";
import NavigationService from "../../appUtils/NavigationService";
import ButtonLarge from "../ButtonLarge";
import { CardSection } from "../common";
import { backgroundColor } from "../../appUtils/puppet";

export class SignInForm extends Component {
  render() {
    return (
      <View id="SignInForm" style={{ backgroundColor, flex: 1 }}>
        <View style={{ flex: 0.5 }} />
        <CardSection>
          <CodeInput
            id="CodeInput"
            ref="codeInputRef"
            codeLength={4}
            space={20}
            size={50}
            inputPosition="center"
            keyboardType="numeric"
            onFulfill={code => this.props.sendCode(code)}
          />
        </CardSection>

        <CardSection>
          <ButtonLarge
            id="ButtonLarge"
            text="Get Another Code"
            onPress={() => {
              this.refs.codeInputRef.clear();
              NavigationService.navigate("getCode");
            }}
          />
        </CardSection>

        {renderErrorAndLoading(this.props.error, this.props.loading)}
        <View style={{ flex: 2 }} />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { error, loading } = auth;
  return { error, loading };
};

export default connect(
  mapStateToProps,
  { sendCode }
)(SignInForm);
