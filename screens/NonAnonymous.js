import React, { Component } from 'react';
import { View } from 'react-native';
import requireAuth from '../components/requireAuth';

class NonAnonymous extends Component {
	render() {
		return <View />;
	}
}

export default requireAuth(NonAnonymous);
