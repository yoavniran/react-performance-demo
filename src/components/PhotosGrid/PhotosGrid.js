import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {TYPES, FETCH_STATUSES} from "../../consts";
import boundActions from "../../actions";
import {
	selectPhotoIds,
	selectFetchStatus,
} from "./PhotosGrid.selectors";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import RenderCounter from "../RenderCounter/RenderCounter";
import PhotoItem from "../PhotoItem/PhotoItem";

import styles from "./PhotosGrid.module.scss";

class PhotosGrid extends Component {

	componentDidMount() {
		if (!this.props.photos.length && this.props.fetchStatus === FETCH_STATUSES.NONE) {
			this.props[TYPES.FETCH_PHOTOS]();
		}
	}

	renderFetchStatus(fetchStatus) {
		return (fetchStatus !== FETCH_STATUSES.NONE) ?
			<div className={cx(styles.status, "pabs")}>
				<LoadingIndicator size="32"/>
			</div> : null;
	}

	render() {
		console.log(">>>>>>>>>>>> RENDERING PHOTOS GRID");

		const {photos, fetchStatus} = this.props;

		return (
			<div className={cx(styles.container, "pr w-100 h-100 df flex-wrap")}>

				{this.renderFetchStatus(fetchStatus)}

				{!photos.length ? <LoadingIndicator/> : null}

				{photos.map((pId) => (
					<PhotoItem
						key={pId}
						id={pId}/>
				))}
			</div>
		);
	}
}

export default connect(
	(state) => ({
		fetchStatus: selectFetchStatus(state),
		photos: selectPhotoIds(state),
	}),
	boundActions,
)(RenderCounter(PhotosGrid, () => ({style: {height: "100%"}})));
