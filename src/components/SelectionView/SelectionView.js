import React from "react";
import {connect} from "react-redux";
import cx from "classnames";
import AutoSizer from "react-virtualized-auto-sizer";
import {TYPES, VIEW_STATES} from "../../consts";
import boundActions from "../../actions";
import Header from "../Header/Header";
import PhotosGrid from "../PhotosGrid/PhotosGrid";
import PhotosList from "../PhotosList/PhotosList";

import styles from "./SelectionView.module.scss";
import RenderCounter from "../RenderCounter/RenderCounter";

//todo: need to wrap PhotosList with Autosizer + react-window's FixedSizeList

const renderGrid = (props) => (
	<AutoSizer>
		{({height, width}) =>
			<PhotosGrid height={height} width={width}
			            scrollTop={props.gridScrollTop}
			            reportLastScrollTop={(scrollTop) => {
				            props[TYPES.SET_GRID_SCROLLTOP]({scrollTop});
			            }}/>
		}
	</AutoSizer>
);

const SelectionView = (props) => {
	const isExpanded = props.viewState === VIEW_STATES.EXPANDED;

	return (
		<div className={cx(styles.container, {
			[`${[styles.minified]} df flex-col`]: !isExpanded,
			"h-100 of-hidden": isExpanded,
		})}>
			<Header viewState={props.viewState}/>

			<section className={cx(styles.section, "of-auto h-100")}>
				{isExpanded ? renderGrid(props) : <PhotosList/>}
			</section>
		</div>
	);
};

const computeProps = (props) => ({
	style: {
		height: props.viewState === VIEW_STATES.EXPANDED ? "100%" : "auto",
		overflow: "hidden",
	}
});

export default connect(
	(state)=>({
		gridScrollTop: state.gridScrollTop
	}),
	boundActions
)(RenderCounter(SelectionView, computeProps));