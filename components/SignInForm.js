import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendCode, anotherCode } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';
import NavigationService from '../appUtils/NavigationService';

class SignInForm extends Component {
	state = { code: '' };

	render() {
		return (
			<View>
				{renderErrorAndLoading(this.props.error, this.props.loading)}
				<View style={{ marginBottom: 10 }}>
					<FormLabel>Enter Code</FormLabel>
					<FormInput
						value={this.state.code}
						onChangeText={code => this.setState({ code })}
						keyboardType={'phone-pad'}
					/>
				</View>

				<Button
					onPress={() => this.props.sendCode(this.state.code)}
					title="Submit"
				/>

				<Button
					onPress={() => NavigationService.navigate('getCode')}
					title="Get Another Code"
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
	{ sendCode }
)(SignInForm);
