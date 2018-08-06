import React from 'react';
import { View } from 'react-native';
import { ErrorMessage, Spinner } from '../components/common';

export const renderErrorAndLoading = (error, loading) => {
	if (error) {
		return (
			<View style={styles.containerStyle}>
				<ErrorMessage error={error} />
			</View>
		);
	}
	if (loading) {
		return (
			<View style={styles.containerStyle}>
				<Spinner size="large" />
			</View>
		);
	}
};

const styles = {
	containerStyle: {
		marginTop: 20,
		marginBottom: 20
	}
};
