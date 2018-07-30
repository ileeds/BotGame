import React, { Component } from 'react';
import { View } from 'react-native';
import SignInForm from '../components/SignInForm';
import Welcome from '../components/Welcome';

class EnterCode extends Component {
	render() {
		return (
			<View>
				<Welcome />
				<SignInForm />
			</View>
		);
	}
}

export default EnterCode;
