import React, { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	ActivityIndicator,
	Alert
} from 'react-native';
import * as Location from 'expo-location';

import Colors from '../constants/Colors';

const LocationPicker = () => {
	const [
		location,
		setLocation
	] = useState();
	const [
		isLoading,
		setIsLoading
	] = useState(false);

	const verifyPermissions = async () => {
		const result = await Location.requestForegroundPermissionsAsync();

		if (result.status !== 'granted') {
			Alert.alert(
				'Permissions Denied',
				'You must grant location permissions to use this app',
				[
					{ text: 'Okay' }
				]
			);
			return false;
		}
		return true;
	};
	const getLocationHandler = async () => {
		const hasPermission = await verifyPermissions();
		if (!hasPermission) return;
		try {
			setIsLoading(true);
			const {
				coords
			} = await Location.getCurrentPositionAsync();
			setLocation({
				lat : coords.latitude,
				lng : coords.longitude
			});
		} catch (err) {
			Alert.alert(
				'Error',
				'Could not fetch location, please try again later or pick on the map!',
				[
					{ text: 'Okay' }
				]
			);
		}
		setIsLoading(false);
	};

	return (
		<View style={styles.locationPicker}>
			<MapPreview
				style={styles.preview}
				location={location}
			>
				{isLoading ? (
					<ActivityIndicator
						size="large"
						color={Colors.primary}
					/>
				) : (
					<Text>No location chosen yet!</Text>
				)}
			</MapPreview>
			<Button
				title="Get User Location"
				color={Colors.primary}
				onPress={getLocationHandler}
			/>
		</View>
	);
};

export default LocationPicker;

const styles = StyleSheet.create({
	locationPicker : {
		marginBottom : 15
	},
	preview        : {
		marginBottom : 10,
		width        : '100%',
		height       : 150,
		borderColor  : '#ccc',
		borderWidth  : 1
	}
});
