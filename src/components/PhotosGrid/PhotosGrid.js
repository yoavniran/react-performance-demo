import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {TYPES, FETCH_STATUSES} from "../../consts";
import boundActions from "../../actions";
// import {selectViewState} from "../../selectors";
import {
	selectPhotos,
	selectFetchStatus,
} from "./PhotosGrid.selectors";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import RenderCounter from "../RenderCounter/RenderCounter";
import PhotoItem from "../PhotoItem/PhotoItem";

import styles from "./PhotosGrid.module.scss";

//todo: PureComponent !!!!!!!!!!!!!

//todo: keys gotchas !!!!!!!!! BASIC

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
		const {photos, fetchStatus} = this.props;

		return (
			<div className={cx(styles.container, "pr w-100 h-100 df flex-wrap")}>

				{this.renderFetchStatus(fetchStatus)}

				{!photos.length ? <LoadingIndicator/> : null}

				{photos.map((p) => (
					<PhotoItem
						key={p.url}
						item={p}/>
				))}
			</div>
		);
	}
}

export default connect(
//todo !!!!!!!!!!!!! selecting too much data (selected photos)
	//todo move selecting of most photo data into the item itself !!!!!!!!!

	(state) => ({
		fetchStatus: selectFetchStatus(state),
		photos: selectPhotos(state),
	}),
	boundActions,
)(RenderCounter(PhotosGrid, () => ({style: {height: "100%"}})));
