import {createSelector} from "reselect";

const getPhoto = (state) => state.exposedPhoto;

const selectExposedPhoto = createSelector(
	getPhoto,
	(photo) => photo ? ({
		id: photo.public_id,
	}) : null
);

export {
	selectExposedPhoto,
}

