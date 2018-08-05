import React, { Component } from 'react';
import { View } from 'react-native';
import SignUpForm from '../components/SignUpForm';
import WelcomeHeader from '../components/WelcomeHeader';

class SendCode extends Component {
	render() {
		return (
			<View>
				<WelcomeHeader />
				<SignUpForm />
			</View>
		);
	}
}

export default SendCode;
