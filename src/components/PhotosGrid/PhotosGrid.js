import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {FixedSizeGrid as Grid} from "react-window";
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

const getItemIndex = (col, row, colCount) => ((row * colCount) + col);

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

	renderItems(){
		const {height, width, photos} = this.props;

		const colCount = Math.floor(width / 250),
			rowCount = photos.length / colCount;

		return <Grid
			initialScrollOffset={-260}
				columnCount={colCount}
		          columnWidth={250}
		          height={height}
		          rowCount={(rowCount+1)}
		          rowHeight={250}
		          width={width}>
			{({ columnIndex, rowIndex, style })=>
				<PhotoItem index={getItemIndex(columnIndex, rowIndex, colCount)}
				           style={style}/>}
		</Grid>
	}

	render() {
		const {photos, fetchStatus} = this.props;

		return (
			<div className={cx(styles.container, "pr w-100 h-100")}>

				{this.renderFetchStatus(fetchStatus)}

				{!photos.length ?
					<LoadingIndicator /> :
					this.renderItems()}
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
