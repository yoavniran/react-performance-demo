import Immutable from "seamless-immutable";
import createReducer from "../common/reducerBase";
import {TYPES, VIEW_STATES, FETCH_STATUSES} from "../consts";

const initialState = Immutable({
	viewState: VIEW_STATES.EXPANDED,

	photosFetchStatus: FETCH_STATUSES.NONE,

	photos: [],
	nextCursor: null,

	exposedPhoto: null,
});

const getPhotoIndex = (photos, id) =>
	photos
		.findIndex((p) => p.public_id === id);

const setExposedPhoto = (state, photo) =>
	state.set("exposedPhoto", photo);

const updateExposedPhotoToFirstSelected = (state) =>
	setExposedPhoto(state, state.photos.find((p) => p.selected));

export default createReducer(initialState, {

	[TYPES.SET_PHOTOS]: (state, {payload}) =>
		state.merge({
			"photos": state.photos.concat(payload.photos),  //todo: !!!!!!! photos is always a new object
			"nextCursor": payload.nextCursor,
		}),

	[TYPES.SET_SELECTED_PHOTO]: (state, {payload}) => {
		const index = getPhotoIndex(state.photos, payload.id);

		state = state.setIn(["photos", index, "selected"], payload.selected);

		if (payload.selected) {
			state = setExposedPhoto(state, state.photos[index]); //todo: same object...
		}
		else if (state.exposedPhoto.public_id === payload.id) {
			state = updateExposedPhotoToFirstSelected(state);
		}

		return state;
	},

	[TYPES.TOGGLE_VIEW_STATE]: (state) =>
		state.set("viewState",
			(state.viewState === VIEW_STATES.EXPANDED ?
				VIEW_STATES.MINIFIED :
				VIEW_STATES.EXPANDED)),

	[TYPES.SET_FETCH_STATUS]: (state, {payload}) =>
		state.set("photosFetchStatus", payload.status),

	[TYPES.SET_EXPOSED_PHOTO]: (state, {payload}) =>
		setExposedPhoto(state,
			state.photos[getPhotoIndex(state.photos, payload.id)]),

	[TYPES.REMOVE_PHOTO]: (state, {payload}) => {
		const index = getPhotoIndex(state.photos, payload.id);

		state = state.set("photos",
			state.photos.slice(0, index)
				.concat(state.photos.slice((index + 1))));

		if (state.exposedPhoto.public_id === payload.id) {
			state = updateExposedPhotoToFirstSelected(state);
		}

		return state;
	},

	[TYPES.SET_PHOTOS_PRICES]: (state, {payload}) => {
		const photos = state.photos,
			newPhotos = [];

		payload.prices.forEach((price) => {
			const index = getPhotoIndex(photos, price.id);

			if (~index) {

				if (photos[index].price !== price.price){
					console.log("!!!!!!!!!!! NEW PRICE !!!!!!!!!! ", index, price.price);
				}

				//todo !!!!!!!!!! only create new object for price change
				newPhotos.push({
					...photos[index],
					price: price.price,
				});
			}
		});

		return state.set("photos", newPhotos);
	},
});
