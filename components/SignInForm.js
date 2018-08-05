import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendCode, anotherCode } from '../actions';
import ErrorMessage from './ErrorMessage';

class SignInForm extends Component {
	state = { code: '' };

	render() {
		return (
			<View>
				<ErrorMessage error={this.props.error} />
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

const mapStateToProps = ({ auth }) => {
	const { error } = auth;
	return { error };
};

export default connect(
	mapStateToProps,
	{ sendCode, anotherCode }
)(SignInForm);
