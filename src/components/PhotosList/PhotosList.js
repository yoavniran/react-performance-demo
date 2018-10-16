import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {TYPES} from "../../consts";
import boundActions from "../../actions";
import RenderCounter from "../RenderCounter/RenderCounter";
import PhotoItem from "../PhotoItem/PhotoItem";
import {selectSelectedPhotos} from "./PhotosList.selectors";

import styles from "./PhotosList.module.scss";

const PhotosList = (props) => {

	return (
		<div className={cx(styles.container)}>
			{props.photos.map((p) => (
				<PhotoItem
					key={p.url}
					item={p}
					horizontal/>
			))}
		</div>
	);
};

export default connect(
	//todo !!!!!!!!!!!!! selecting too much data (selected photos)
	//todo move selecting of most photo data into the item itself !!!!!!!!!

	(state) => ({
		photos: selectSelectedPhotos(state),
	}),
	boundActions,
)(RenderCounter(PhotosList));