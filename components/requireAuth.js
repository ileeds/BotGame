import React, { Component } from 'react';
import { connect } from 'react-redux';

export default ChildComponent => {
	class ComposedComponent extends Component {
		componentDidMount() {
			this.shouldNavigateAway();
		}

		componentDidUpdate() {
			this.shouldNavigateAway();
		}

		shouldNavigateAway() {
			if (!this.props.loggedIn) {
				this.props.navigation.pop();
				if (this.props.codeSent) {
					this.props.navigation.navigate('enterCode');
				} else {
					this.props.navigation.navigate('sendCode');
				}
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	const mapStateToProps = ({ auth }) => {
		const { loggedIn, codeSent } = auth;
		return { loggedIn, codeSent };
	};

	return connect(mapStateToProps)(ComposedComponent);
};
