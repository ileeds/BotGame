import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';
import HomeHeader from '../components/HomeHeader';

class Home extends Component {
	render() {
		return (
			<View>
				<HomeHeader />
			</View>
		);
	}
}

export default requireAuth(Home);
