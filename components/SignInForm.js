import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendCode, anotherCode } from '../actions';

const ROOT_URL =
	'https://us-central1-one-time-password-1bd5c.cloudfunctions.net';

class SignInForm extends Component {
	state = { code: '' };

	render() {
		return (
			<View>
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Code</FormLabel>
					<FormInput
						value={this.state.code}
						onChangeText={code => this.setState({ code })}
						keyboardType={'phone-pad'}
					/>
				</View>

				<Button
					onPress={() => this.props.sendCode(this.state.code)}
					title="Submit"
				/>

				<Button
					onPress={() => this.props.anotherCode()}
					title="Get Another Code"
				/>
			</View>
		);
	}
}

export default connect(
	null,
	{ sendCode, anotherCode }
)(SignInForm);
