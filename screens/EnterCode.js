import React, { Component } from 'react';
import { View } from 'react-native';
import SignInForm from '../components/SignInForm';
import WelcomeHeader from '../components/WelcomeHeader';

class EnterCode extends Component {
	render() {
		return (
			<View>
				<WelcomeHeader />
				<SignInForm />
			</View>
		);
	}
}

export default EnterCode;
