import {createSelector} from "reselect";
import {takePhotoProps} from "../../selectors"

const getPhoto = (state) => state.exposedPhoto;

const selectExposedPhoto = createSelector(
	getPhoto,
	(photo) => photo ? takePhotoProps(photo) : null
);

export {
	selectExposedPhoto,
}

