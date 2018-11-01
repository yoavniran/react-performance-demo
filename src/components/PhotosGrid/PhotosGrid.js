import React, {createRef, Component} from "react";
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
		else if (this.props.scrollTop && this.gridRef.current) {
			this.gridRef.current.scrollTo({scrollTop: this.props.scrollTop});
		}
	}

	componentWillUnmount() {
		this.props.reportLastScrollTop(this.gridScrollTop);
	}

	gridRef = createRef();
	gridScrollTop = 0;

	renderFetchStatus(fetchStatus) {
		return (fetchStatus !== FETCH_STATUSES.NONE) ?
			<div className={cx(styles.status, "pabs")}>
				<LoadingIndicator size="32"/>
			</div> : null;
	}

	renderLoadingIndicator(){
		const {width, height} = this.props;

		return <div className="pr" style={{width, height}}>
			<LoadingIndicator/>
		</div>
	}

	renderItems() {
		const {height, width, photos} = this.props;

		const colCount = Math.floor(width / 250),
			rowCount = photos.length / colCount;

		return <Grid
			ref={this.gridRef}
			columnCount={colCount}
			columnWidth={250}
			height={height}
			rowCount={(rowCount + 1)}
			rowHeight={270}
			width={width}
			onScroll={({scrollTop}) => {
				this.gridScrollTop = scrollTop;
			}}>
			{({columnIndex, rowIndex, style}) =>
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
					this.renderLoadingIndicator() :
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
