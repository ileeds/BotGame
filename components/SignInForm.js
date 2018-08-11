import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { sendCode, anotherCode } from '../actions';
import { renderErrorAndLoading } from '../appUtils/renderFunctions';
import NavigationService from '../appUtils/NavigationService';
import { CardSection, Input, Button } from './common';

class SignInForm extends Component {
	state = { code: '' };

	render() {
		return (
			<View>
				<CardSection>
					<Input
						label="Code"
						placeholder="1111"
						onChangeText={code => this.setState({ code })}
						value={this.state.code}
						keyboardType={'phone-pad'}
					/>
				</CardSection>

				<Button onPress={() => this.props.sendCode(this.state.code)}>
					Submit
				</Button>

				<Button onPress={() => NavigationService.navigate('getCode')}>
					Get Another Code
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
	{ sendCode }
)(SignInForm);
