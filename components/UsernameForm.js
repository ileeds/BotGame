import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { setUsername } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';

class UsernameForm extends Component {
	state = { username: '' };

	render() {
		return (
			<View>
				{renderErrorAndLoading(this.props.error, this.props.loading)}
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Username</FormLabel>
					<FormInput
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
					/>
				</View>
				<Button
					onPress={() => this.props.setUsername(this.state.username)}
					title="Submit"
				/>
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
