import React, { Component } from 'react';
import { View } from 'react-native';
import SignUpForm from '../components/SignUpForm';
import Welcome from '../components/Welcome';

class SendCode extends Component {
	render() {
		return (
			<View>
				<Welcome />
				<SignUpForm />
			</View>
		);
	}
}

export default SendCode;
