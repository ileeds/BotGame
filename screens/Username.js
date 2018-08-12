import React, { Component } from 'react';
import { View } from 'react-native';
import UsernameForm from '../components/UsernameForm';
import WelcomeHeader from '../components/WelcomeHeader';

class Username extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<WelcomeHeader />
				<UsernameForm />
			</View>
		);
	}
}

export default Username;
