import {TYPES, FETCH_STATUSES} from "./consts";
import createBoundActionCreators, {createCustomCreator} from "./common/actionsBase";

const API_DOMAIN = "http://localhost:9999/";

const getData = async (resource) => {
	let res;

	try {
		res = await fetch(`${API_DOMAIN}${resource}`,
			{
				headers: {
					"Accept": "application/json",
					"Content-Type": "application/json",
				},
			});
	}
	catch (ex) {
		console.error("FAILED TO FETCH DATA FROM SERVER !!!!!!!!!!!!!! ", ex);
	}

	return res ? res.json() : {error: true};
};

const fetchPhotos = async (getState, dispatcher, cursor = null) => {

	dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.PROGRESS});
	const response = await getData(`photos${cursor ? `?cursor=${cursor}` : "" }`);
	console.log("retrieved photos !!!!!!", response);

	if (!response.error) {
		dispatcher(TYPES.SET_PHOTOS, {
			photos: response.photos,
			nextCursor: response.meta.next,
		});

		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.NONE});

		if (response.meta.next) {
			fetchPhotos(getState, dispatcher, response.meta.next);
		}
	}
	else {
		dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.FAILED});
	}
};

export default createBoundActionCreators(TYPES, {

	[TYPES.FETCH_PHOTOS]: createCustomCreator(
		(dispatch, getState, dispatcher) => {

			fetchPhotos(getState, dispatcher);
			// dispatcher(TYPES.SET_FETCH_STATUS, {status: FETCH_STATUSES.PROGRESS});
			// const response = await getData("photos");
			// console.log("retrieved photos !!!!!!", response);
			//
			// dispatcher(TYPES.SET_PHOTOS, {
			// 	photos: response.photos,
			// 	nextCursor: response.meta.next,
			// });
			//
			// if (response.meta.next) {
			// 	fetchAdditionalPhotos(response.meta.next, getState, dispatcher);
			// }
		}),
});