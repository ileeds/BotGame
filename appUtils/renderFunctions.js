import React from 'react';
import { Text } from 'react-native';
import NavigationService from './NavigationService';
import { Button, ErrorMessage, Spinner } from '../components/common';
import { backgroundColor } from './puppet';

export const renderErrorAndLoading = (error, loading) => {
	if (error) {
		return <ErrorMessage error={error} />;
	}
	if (loading) {
		return <Spinner size="large" />;
	}
};
