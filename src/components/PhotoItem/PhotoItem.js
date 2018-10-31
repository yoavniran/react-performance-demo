import React from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {Image} from "cloudinary-react";
import {TYPES, CLOUD} from "../../consts";
import bindActions from "../../actions";
import RenderCounter from "../RenderCounter/RenderCounter";
import Svg from "../Svg/Svg";
import icons from "../../assets/icons";
import {getPhotoByIdSelector} from "./PhotoItem.selectors";

import styles from "./PhotoItem.module.scss";

const toggleSelected = (e, props) => {
	const {id, selected} = props;
	props[TYPES.SET_SELECTED_PHOTO]({id, selected: !selected});

	e.stopPropagation();
};

const deletePhoto = (e, props) => {
	props[TYPES.REMOVE_PHOTO]({id: props.id});
	e.stopPropagation();
};

const setExposed = (props) => {
	props[TYPES.SET_EXPOSED_PHOTO]({id: props.id});
};

const PhotoItem = (props) => {
	const {id, filename, width, height, selected, price} = props,
		horizontal = props.horizontal;

	return (
		props.id ?
		<article
			className={cx(styles.container, "pr pointer", {
				[`${styles.horizontal} df center `]: horizontal,
				"dib": !horizontal
			})}
			onClick={(e) => {
				if (!horizontal) {
					toggleSelected(e, props);
				}
				else {
					setExposed(props);
				}
			}}>

			<Image className={cx(styles.image, {[styles["hor-image"]]: horizontal})}
			       cloudName={CLOUD}
			       publicId={id}
			       quality="auto"
			       fetchFormat="auto"
			       height={horizontal ? "240" : "720"}
			       width={horizontal ? "240" : "720"} crop="scale"/>

			<div className={cx(styles.info, "df just-between", {
				[`${styles["info-hor"]} `]: horizontal,
			})}>
				<span className={cx(styles.name, "dib")} title={filename}>{filename}</span>
				<span className={cx(styles.dims, "dib")}>{`${width}x${height}`}</span>
			</div>

			{!horizontal ? <span className={cx(styles["actions-bg"], "pabs")}></span> : null}

			{price ? <div className={cx(styles.price, {
				"pabs": !horizontal
			})}>${price}</div> : null}

			<div className={cx(styles.actions, "df center", {
				"pabs": !horizontal,
				[`${styles["actions-hor"]}`]: horizontal
			})}>
				{selected ? <Svg path={icons.check}
				                 className={cx(styles.check)} size="xl" title="un-select"
				                 fill="#6bd6ef" onClick={(e) => toggleSelected(e, props)}/> : null}
				<Svg className={cx(styles.action)}
				     title="delete"
				     path={icons.delete} size="xl" fill="#ffffff"
				     onClick={(e) => deletePhoto(e, props)}/>
			</div>
		</article> : null
	);
};

const getMapState = () => { //using the factory pattern
	const photoSelector = getPhotoByIdSelector();

	return (state, props) => { //return function to react-redux' mapstate

		if (!props.id) {
			if (state.photos[props.index]) {
				props = {id: state.photos[props.index].public_id};
			}
		}

		return {...photoSelector(state, props)};
	};
};

export default connect(
	getMapState,
	bindActions,
)(RenderCounter(PhotoItem, (props)=>({style: props.style})));