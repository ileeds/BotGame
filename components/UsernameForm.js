import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';
import { CardSection, Input, Button } from './common';

class UsernameForm extends Component {
	state = { username: '' };

	render() {
		return (
			<View>
				<CardSection>
					<Input
						label="Username"
						placeholder="User123"
						onChangeText={username => this.setState({ username })}
						value={this.state.username}
					/>
				</CardSection>

				<Button onPress={() => this.props.setUsername(this.state.username)}>
					Submit
				</Button>

				{renderErrorAndLoading(this.props.error, this.props.loading)}
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
