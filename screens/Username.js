import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';
import UsernameForm from '../components/UsernameForm';
import WelcomeHeader from '../components/WelcomeHeader';

class Username extends Component {
	render() {
		return (
			<View>
				<WelcomeHeader />
				<UsernameForm />
			</View>
		);
	}
}

export default requireAuth(Username);
