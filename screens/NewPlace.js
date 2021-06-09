import React, { useState } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	Button
} from 'react-native';
import { useDispatch } from 'react-redux';

import ImgPicker from '../components/ImgPicker';
import Colors from '../constants/Colors';
import { addPlace } from '../store/actions/places';

const NewPlace = ({ navigation }) => {
	const [
		title,
		setTitle
	] = useState('');
	const [
		address,
		setAddress
	] = useState('');
	const [
		img,
		setImg
	] = useState();

	const dispatch = useDispatch();

	const savePlaceHandler = () => {
		dispatch(addPlace(title, img, address));
		navigation.goBack();
	};

	return (
		<ScrollView>
			<View style={styles.form}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.textInput}
					value={title}
					onChangeText={setTitle}
				/>
				<Text style={styles.label}>Address</Text>
				<TextInput
					style={styles.textInput}
					value={address}
					onChangeText={setAddress}
				/>
				<ImgPicker onImgSelect={setImg} />
				<Button
					title="Save Place"
					color={Colors.primary}
					onPress={savePlaceHandler}
				/>
			</View>
		</ScrollView>
	);
};

NewPlace.navigationOptions = ({ navigation }) => ({
	headerTitle : 'Create New Place'
});

export default NewPlace;

const styles = StyleSheet.create({
	form      : {
		margin : 30
	},
	label     : {
		fontSize     : 20,
		marginBottom : 15
	},
	textInput : {
		borderBottomColor : '#ccc',
		borderBottomWidth : 1,
		marginBottom      : 15,
		paddingVertical   : 4,
		paddingHorizontal : 2,
		fontSize          : 18
	}
});
