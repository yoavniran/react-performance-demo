import {createSelector} from "reselect";
import {takePhotoProps} from "../../selectors";

const getPhoto = (state, props) => {
	return state.photos
		.find((p) => p.public_id === props.id);
};

const selectIsSelectedById = (state, props) =>
	!!~state.selected.indexOf(props.id);

const selectPhotoById = createSelector(
	[
		getPhoto,
		selectIsSelectedById
	],
	(photo, selected) => {
		return ({...takePhotoProps(photo), selected});
	}
);

const getPhotoByIdSelector = () =>
	createSelector(
		[
			getPhoto,
			selectIsSelectedById
		],
		(photo, selected) =>
			({...takePhotoProps(photo), selected}),
	);

export {
	selectPhotoById,
	selectIsSelectedById,
	getPhotoByIdSelector
}