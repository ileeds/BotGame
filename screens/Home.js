import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import HomeBody from '../components/HomeBody';

class Home extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Home',
			headerRight: (
				<Button
					title="Friends >"
					color="#017BFF"
					onPress={() => navigation.navigate('friends')}
				/>
			),
			style: {
				marginTop: Platform.OS === 'android' ? 24 : 0
			}
		};
	};

	render() {
		return (
			<View style={{ flex: 1 }}>
				<HomeBody />
			</View>
		);
	}
}

export default Home;
