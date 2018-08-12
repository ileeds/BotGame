import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import {
	renderButton,
	renderErrorAndLoading
} from '../appUtils/renderFunctions';
import { CardSection, Input } from './common';
import { backgroundColor } from '../appUtils/puppet';

class UsernameForm extends Component {
	state = { username: '' };

	render() {
		return (
			<View style={{ backgroundColor, flex: 1 }}>
				<View style={{ flex: 0.5 }} />
				<CardSection>
					<Input
						placeholder="Username"
						onChangeText={username => this.setState({ username })}
						value={this.state.username}
					/>
				</CardSection>

				<CardSection>
					{renderButton('Submit', () => {
						this.props.setUsername(this.state.username);
					})}
				</CardSection>

				{renderErrorAndLoading(this.props.error, this.props.loading)}
				<View style={{ flex: 2 }} />
			</View>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	const { error, loading } = auth;
	return { error, loading };
};

export default connect(
	mapStateToProps,
	{ setUsername }
)(UsernameForm);
