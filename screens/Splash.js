import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Splash extends Component {
	navigate(props) {
		if (!props.phone) {
			props.navigation.navigate('start');
		} else if (!props.loggedIn) {
			props.navigation.navigate('enterCode');
		} else if (!props.username) {
			props.navigation.navigate('username');
		} else {
			props.navigation.navigate('main');
		}
	}

	componentDidMount() {
		this.navigate(this.props);
	}

	componentWillReceiveProps(nextProps) {
		this.navigate(nextProps);
	}

	render() {
		return <View />;
	}
}

const mapStateToProps = ({ auth }) => {
	const { phone, loggedIn, username } = auth;
	return { phone, loggedIn, username };
};

export default connect(mapStateToProps)(Splash);
