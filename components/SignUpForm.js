import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCode } from '../actions';

const ROOT_URL =
	'https://us-central1-one-time-password-1bd5c.cloudfunctions.net';

class SignUpForm extends Component {
	state = { phone: '' };

	render() {
		return (
			<View>
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Phone Number</FormLabel>
					<FormInput
						value={this.state.phone}
						onChangeText={phone => this.setState({ phone })}
						keyboardType={'phone-pad'}
					/>
				</View>
				<Button
					onPress={() => this.props.getCode(this.state.phone)}
					title="Submit"
				/>
			</View>
		);
	}
}

export default connect(
	null,
	{ getCode }
)(SignUpForm);
