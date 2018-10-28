import React from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {FETCH_STATUSES} from "../../consts";
import boundActions from "../../actions";
import RenderCounter from "../RenderCounter/RenderCounter";
import PhotoItem from "../PhotoItem/PhotoItem";
import {selectSelectedPhotos, selectFetchStatus} from "./PhotosList.selectors";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

import styles from "./PhotosList.module.scss";

const renderFetchStatus = (fetchStatus) => {
	return (fetchStatus !== FETCH_STATUSES.NONE) ?
		<div className={cx(styles.status, "pabs")}>
			<LoadingIndicator size="32"/>
		</div> : null;
};

const PhotosList = (props) => {

	return (
		<div className={cx(styles.container, "h-100")}>
			{renderFetchStatus(props.fetchStatus)}

			{props.photos.map((id) => (
				<PhotoItem
					key={id}
					id={id}
					horizontal/>
			))}
		</div>
	);
};

export default connect(
	(state) => ({
		fetchStatus: selectFetchStatus(state),
		photos: selectSelectedPhotos(state),
	}),
	boundActions,
)(RenderCounter(PhotosList, ()=>({style: {height: "100%"}})));