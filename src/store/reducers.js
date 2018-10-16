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

export default createReducer(initialState, {

	[TYPES.SET_PHOTOS]: (state, {payload}) =>
		state.merge({
			"photos": state.photos.concat(payload.photos),  //todo: !!!!!!! photos is always a new object
			"nextCursor": payload.nextCursor,
		}),

	[TYPES.SET_SELECTED_PHOTO]: (state, {payload}) => {
		const index = getPhotoIndex(state.photos, payload.id);

		if (payload.selected) {
			state = setExposedPhoto(state, state.photos[index]); //todo: same object...
		}

		return state.setIn(["photos", index, "selected"], payload.selected);
	},

	[TYPES.TOGGLE_VIEW_STATE]: (state) =>
		state.set("viewState",
			(state.viewState === VIEW_STATES.EXPANDED ?
				VIEW_STATES.MINIFIED :
				VIEW_STATES.EXPANDED)),

	[TYPES.SET_FETCH_STATUS]: (state, {payload}) =>
		state.set("photosFetchStatus", payload.status),

	[TYPES.SET_EXPOSED_PHOTO]: (state, {payload}) =>
		setExposedPhoto(state, payload.photo),
});
