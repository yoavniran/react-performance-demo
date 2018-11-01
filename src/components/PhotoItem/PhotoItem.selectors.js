import {createSelector} from "reselect";
import {takePhotoProps} from "../../selectors";

const getPhoto = (state, props) => {
	return props.photo ||
		state.photos
			.find((p) => p.public_id === props.id);
};

const selectIsSelectedById = (state, props) =>
	!!~state.selected.indexOf(props.id);

export const getPhotoByIdSelector = () =>
	createSelector(
		[
			getPhoto,
			selectIsSelectedById
		],
		(photo, selected) => {

			let i = 0;
			while (i < 1000000) {
				i++
			}

			const photoProps = photo ? takePhotoProps(photo) : null;

			return {...photoProps, selected};
		}
	);