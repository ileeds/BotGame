import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class Splash extends Component {
	navigate(props) {
		if (props.loggedIn) {
			props.navigation.navigate('home');
		} else if (props.codeSent) {
			props.navigation.navigate('enterCode');
		} else {
			props.navigation.navigate('sendCode');
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
	const { loggedIn, codeSent } = auth;
	return { loggedIn, codeSent };
};

export default connect(mapStateToProps)(Splash);
