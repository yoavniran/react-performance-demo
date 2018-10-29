import {createSelector} from "reselect";

const getPhotos = (state) => state.photos;

const selectPhotoIds = createSelector(
	getPhotos,
	(photos) => photos.map((p) => p.public_id),
);

const selectFetchStatus = (state) => state.photosFetchStatus;

export {
	selectFetchStatus,
	selectPhotoIds,
};