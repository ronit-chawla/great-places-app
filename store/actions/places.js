import * as FileSystem from 'expo-file-system';

import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (
	title,
	img,
	address
) => async dispatch => {
	const fileName = img.split('/').pop();
	const newPath = FileSystem.documentDirectory + fileName;
	try {
		await FileSystem.moveAsync({
			from : img,
			to   : newPath
		});
		const dbResult = await insertPlace(
			title,
			newPath,
			address,
			15,
			15
		);
		dispatch({
			type  : ADD_PLACE,
			place : {
				title,
				img     : newPath,
				address,
				id      : dbResult.insertId
			}
		});
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const loadPlaces = () => async dispatch => {
	try {
		const dbResult = await fetchPlaces();
		const places = dbResult.rows._array;
		dispatch({ type: SET_PLACES, places });
	} catch (err) {
		throw err;
	}
};
