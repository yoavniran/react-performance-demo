import React, {Fragment} from "react";
import cx from "classnames";
import {VIEW_STATES} from "../../consts";
import Header from "../Header/Header";
import PhotosGrid from "../PhotosGrid/PhotosGrid";
import PhotosList from "../PhotosList/PhotosList";

import styles from "./SelectionView.module.scss";

const SelectionView = (props) => {
	const isExpanded = props.viewState === VIEW_STATES.EXPANDED;

	return (
		<div className={cx(styles.container, {
			[styles.minified]: !isExpanded,
			"df flex-col": !isExpanded,
		})}>
			<Header viewState={props.viewState}/>

			<section className="of-auto">
				{isExpanded ? <PhotosGrid/> : <PhotosList/>}
			</section>
		</div>
	);
};

export default SelectionView;