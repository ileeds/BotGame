import React, { Component } from 'react';
import { View } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import HomeBody from '../components/HomeBody';

class Home extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<HomeHeader />
				<HomeBody />
			</View>
		);
	}
}

export default Home;
