import React, { useState } from 'react';
import {
	Alert,
	Button,
	Image,
	StyleSheet,
	Text,
	View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Camera from 'expo-camera';

import Colors from '../constants/Colors';

const ImgPicker = ({ onImgSelect }) => {
	const [
		image,
		setImage
	] = useState();

	const verifyPermissions = async type => {
		let result;
		if (type === 'camera')
			result = await Camera.requestPermissionsAsync();
		if (type === 'gallery')
			result = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (result.status !== 'granted') {
			Alert.alert(
				'Permissions Denied',
				'You must grant camera and media permissions to use this app',
				[
					{ text: 'Okay' }
				]
			);
			return false;
		}
		return true;
	};
	const takeImageHandler = async () => {
		const hasPermission = await verifyPermissions(
			'camera'
		);
		if (!hasPermission) return;
		const img = await ImagePicker.launchCameraAsync({
			allowsEditing : true,
			aspect        : [
				3,
				4
			],
			quality       : 0.75
		});
		setImage(img.uri);
		onImgSelect(img.uri);
	};
	const openLibraryHandler = async () => {
		const hasPermission = await verifyPermissions(
			'gallery'
		);
		if (!hasPermission) return;
		const img = await ImagePicker.launchImageLibraryAsync(
			{
				allowsEditing : true,
				aspect        : [
					16,
					9
				],
				quality       : 0.75
			}
		);
		setImage(img.uri);
		onImgSelect(img.uri);
	};

	return (
		<View style={styles.imgPicker}>
			<View style={styles.preview}>
				{!image && (
					<Text>No image picked yet.</Text>
				)}
				{image && (
					<Image
						style={styles.img}
						source={{ uri: image }}
					/>
				)}
			</View>
			<View style={styles.btnGrp}>
				<Button
					title="Take Image"
					color={Colors.primary}
					onPress={takeImageHandler}
				/>
				<Button
					title="Select Image From Library"
					color={Colors.accent}
					onPress={openLibraryHandler}
				/>
			</View>
		</View>
	);
};

export default ImgPicker;

const styles = StyleSheet.create({
	imgPicker : {
		alignItems   : 'center',
		marginBottom : 15
	},
	preview   : {
		width          : '100%',
		height         : 200,
		marginBottom   : 10,
		justifyContent : 'center',
		alignItems     : 'center',
		borderColor    : '#ccc',
		borderWidth    : 1
	},
	img       : {
		width  : '100%',
		height : '100%'
	},
	btnGrp    : {
		flexDirection  : 'row',
		justifyContent : 'space-between',
		alignItems     : 'center',
		width          : '100%',
		marginVertical : 10
	}
});
