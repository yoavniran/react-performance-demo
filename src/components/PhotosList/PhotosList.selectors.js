import {createSelector} from "reselect";
import {takePhotoProps} from "../../selectors";

const getPhotos = (state) => state.photos;

const selectFetchStatus = (state) => state.photosFetchStatus;

const selectSelectedPhotos = createSelector(
	getPhotos,
	(photos) =>
		photos.filter((p) => p.selected)
			.map(takePhotoProps)
);

export {
	selectSelectedPhotos,
	selectFetchStatus,
}