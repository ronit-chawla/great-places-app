import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const PlaceDetails = ({ navigation }) => {
	const id = navigation.getParam('id');
	const place = useSelector(state =>
		state.places.find(p => p.id === id)
	);

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>{place.title}</Text>
			<Image
				source={{ uri: place.img }}
				style={styles.img}
			/>
			<Text style={styles.address}>
				{place.address}
			</Text>
		</View>
	);
};

PlaceDetails.navigationOptions = ({ navigation }) => ({
	headerTitle : navigation.getParam('title')
});

export default PlaceDetails;

const styles = StyleSheet.create({
	screen  : {
		alignItems       : 'center',
		justifyContent   : 'center',
		marginVertical   : 50,
		marginHorizontal : 15,
		backgroundColor  : '#fff',
		paddingVertical  : 30,
		borderRadius     : 10,
		shadowColor      : Colors.primaryLabel,
		shadowOpacity    : 0.26,
		shadowOffset     : {
			width  : 0,
			height : 2
		},
		shadowRadius     : 8,
		elevation        : 5
	},
	title   : {
		color          : Colors.primary,
		fontSize       : 24,
		marginVertical : 15
	},
	img     : {
		width  : '100%',
		height : 300
	},
	address : {
		color          : Colors.accent,
		fontSize       : 18,
		marginVertical : 15
	}
});
