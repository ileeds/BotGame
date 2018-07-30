import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';

class Result extends Component {
	render() {
		return <View />;
	}
}

export default requireAuth(Result);
