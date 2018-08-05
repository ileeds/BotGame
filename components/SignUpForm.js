import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { getCode } from '../actions';
import ErrorMessage from './ErrorMessage';

class SignUpForm extends Component {
	state = { phone: '' };

	render() {
		return (
			<View>
				<ErrorMessage error={this.props.error} />
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

const mapStateToProps = ({ auth }) => {
	const { error } = auth;
	return { error };
};

export default connect(
	mapStateToProps,
	{ getCode }
)(SignUpForm);
