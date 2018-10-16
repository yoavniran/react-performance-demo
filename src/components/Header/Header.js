import React, {Component} from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {TYPES, VIEW_STATES} from "../../consts";
import {selectPhotosCount} from "./Header.selectors";
import {selectViewState} from "../../selectors";
import boundActions from "../../actions";
import RenderCounter from "../RenderCounter/RenderCounter";
import cldLogo from "../../assets/images/cloudinary.svg";
import Svg from "../Svg/Svg";
import styles from "./Header.module.scss";
import icons from "../../assets/icons";

const Header = (props) => (
	<header className={cx(styles.container, "w-100 center df just-between")}>
		<div className={cx(styles.title, "df center")}>
			<h2>Awesome Photo Store</h2>
			<span className={cx(styles.powered)}>powered by</span>
			<img src={cldLogo} className={cx(styles.logo)}/>
		</div>

		<div className={cx(styles.counter)} title="selected">
			{props.photosCount.selected} / {props.photosCount.all}
		</div>

		<Svg
			onClick={() => props[TYPES.TOGGLE_VIEW_STATE]()}
			className={cx(styles.toggle, "pointer")}
			path={props.viewState === VIEW_STATES.EXPANDED ?
				icons.minimize : icons.expand} size="xxl" fill={"#ffffff"}/>
	</header>
);

export default connect(
	(state) => ({
		photosCount: selectPhotosCount(state),
		viewState: selectViewState(state),
	}),
	boundActions,
)(RenderCounter(Header));