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
				if (this.props.phone) {
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
		const { loggedIn, phone } = auth;
		return { loggedIn, phone };
	};

	return connect(mapStateToProps)(ComposedComponent);
};
