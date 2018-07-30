import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Splash extends Component {
	componentDidMount() {
		if (this.props.loggedIn) {
			this.props.navigation.navigate('home');
		} else {
			this.props.navigation.navigate('sendCode');
		}
	}

	render() {
		return <View />;
	}
}

const mapStateToProps = ({ auth }) => {
	const { loggedIn } = auth;
	return { loggedIn };
};

export default connect(mapStateToProps)(Splash);
