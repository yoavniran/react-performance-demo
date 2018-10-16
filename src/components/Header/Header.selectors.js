import {createSelector} from "reselect";

const getPhotos = (state) => state.photos;


const selectPhotosCount = createSelector(
	getPhotos,
	(photos) =>({
		selected: photos.filter((p) => p.selected).length,
		all: photos.length,
	})
);

export {
	selectPhotosCount,
}