import Place from '../../models/Place';
import { ADD_PLACE, SET_PLACES } from '../actions/places';

const initialState = {
	places : []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PLACES:
			return {
				places : action.places.map(
					p =>
						new Place(
							p.id.toString(),
							p.title,
							p.img,
							p.address
						)
				)
			};
		case ADD_PLACE:
			const newPlace = new Place(
				action.place.id.toString(),
				action.place.title,
				action.place.img,
				action.place.address
			);
			return {
				places : [
					...state.places,
					newPlace
				]
			};
		default:
			return state;
	}
};
