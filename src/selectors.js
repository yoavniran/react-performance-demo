
const takePhotoProps = (photo) =>({
	id: photo.public_id,
	filename: photo.filename,
	width: photo.width,
	height: photo.height,
	url: photo.secure_url,
	selected: photo.selected,
	price: photo.price,
});

const selectViewState = (state) =>
	state.viewState;

export {
	takePhotoProps,
	selectViewState,
}