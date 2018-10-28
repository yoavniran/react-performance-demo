import {createSelector} from "reselect";

const getPhotos = (state) => state.photos;
const getSelected = (state) => state.selected;

const selectPhotosCount = createSelector(
	getSelected,
	getPhotos,
	(selected, photos) =>({
		selected: selected.length,
		all: photos.length,
	})
);

export {
	selectPhotosCount,
}