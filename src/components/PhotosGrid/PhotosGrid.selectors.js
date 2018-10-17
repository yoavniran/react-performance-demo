import {createSelector} from "reselect";
import {takePhotoProps} from "../../selectors";

const getPhotos = (state) => state.photos;

const selectPhotos = createSelector(
	getPhotos,
	(photos) => {
		// console.log("!!!!!!!!!!! recalculating photos !!!!!!!!");
		return photos.map(takePhotoProps)
	},
);

const selectFetchStatus = (state) => state.photosFetchStatus;

export {
	selectPhotos,
	selectFetchStatus,
};