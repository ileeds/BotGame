import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SignUpForm from '../components/SignUpForm';
import Welcome from '../components/Welcome';

class SendCode extends Component {
	componentDidMount() {
		if (this.props.codeSent) {
			this.props.navigation.navigate('enterCode');
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.codeSent) {
			this.props.navigation.navigate('enterCode');
		}
		if (nextProps.loggedIn) {
			this.props.navigation.navigate('home');
		}
	}

	render() {
		return (
			<View>
				<Welcome />
				<SignUpForm />
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { codeSent, loggedIn } = auth;
	return { codeSent, loggedIn };
};

export default connect(mapStateToProps)(SendCode);
