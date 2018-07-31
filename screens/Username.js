import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';
import UsernameForm from '../components/UsernameForm';
import Welcome from '../components/Welcome';

class Username extends Component {
	render() {
		return (
			<View>
				<Welcome />
				<UsernameForm />
			</View>
		);
	}
}

export default requireAuth(Username);
