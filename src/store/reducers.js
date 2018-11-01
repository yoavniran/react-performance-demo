import Immutable from "seamless-immutable";
import createReducer from "../common/reducerBase";
import {TYPES, VIEW_STATES, FETCH_STATUSES} from "../consts";

const initialState = Immutable({
	viewState: VIEW_STATES.EXPANDED,

	photosFetchStatus: FETCH_STATUSES.NONE,

	photos: [],
	nextCursor: null,

	selected: [],

	exposedPhoto: null,

	gridScrollTop: 0,
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
			"photos": state.photos.concat(payload.photos),
			"nextCursor": payload.nextCursor,
		}),

	[TYPES.SET_SELECTED_PHOTO]: (state, {payload}) => {

		const selectedIndex = state.selected.indexOf(payload.id);

		if (!~selectedIndex) { //not found in the selected array yet
			if (payload.selected) {
				state = state.set("selected",
					state.selected.concat(payload.id));
			}
		}
		else if (!payload.selected) { //need to remove from the array
			state = state.set("selected",
				state.selected.filter((s) => s !== payload.id));
		}

		if (payload.selected) {
			const index = getPhotoIndex(state.photos, payload.id);
			state = setExposedPhoto(state, state.photos[index]);
		}
		else if (state.exposedPhoto.public_id === payload.id) {
			state = updateExposedPhotoToFirstSelected(state); //unselected item shouldn't stay as the exposed photo
		}

		return state;
	},

	[TYPES.CLEAR_PHOTOS]: (state) =>
		state.set("photos", []),

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
				newPhotos.push({
					...photos[index],
					price: price.price,
				});
			}
		});

		return state.set("photos", newPhotos);
	},

	[TYPES.SET_GRID_SCROLLTOP]: (state, {payload}) =>
		state.set("gridScrollTop", payload.scrollTop),
});
