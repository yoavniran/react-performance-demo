import React, {Fragment} from "react";
import cx from "classnames";
import {VIEW_STATES} from "../../consts";
import Header from "../Header/Header";
import PhotosGrid from "../PhotosGrid/PhotosGrid";
import PhotosList from "../PhotosList/PhotosList";

import styles from "./SelectionView.module.scss";
import RenderCounter from "../RenderCounter/RenderCounter";

const SelectionView = (props) => {
	const isExpanded = props.viewState === VIEW_STATES.EXPANDED;

	return (
		<div className={cx(styles.container, {
			[styles.minified]: !isExpanded,
			"df flex-col": !isExpanded,
			"h-100": isExpanded,
		})}>
			<Header viewState={props.viewState}/>

			<section className={cx(styles.section, "of-auto")}>
				{isExpanded ? <PhotosGrid/> : <PhotosList/>}
			</section>
		</div>
	);
};

const computeProps = (props) => ({
	style: {
		height: props.viewState === VIEW_STATES.EXPANDED ? "100%" : "auto",
	}
});

export default RenderCounter(SelectionView, computeProps);