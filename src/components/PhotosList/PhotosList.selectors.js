const selectFetchStatus = (state) => state.photosFetchStatus;

const selectSelectedPhotos = (state) => state.selected;

export {
	selectSelectedPhotos,
	selectFetchStatus,
}