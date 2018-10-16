import React, {Component} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {Image} from "cloudinary-react";
import {TYPES, CLOUD} from "../../consts";
import bindActions from "../../actions";
import RenderCounter from "../RenderCounter/RenderCounter";
import Svg from "../Svg/Svg";
import icons from "../../assets/icons";
import styles from "./PhotoItem.module.scss";

//todo: !!!!!!! passing item as object into props instead of spreading props

const PhotoItem = (props) => {

	const {id, filename, width, height, selected} = props.item,
		horizontal = props.horizontal;

	return (
		<article
			className={cx(styles.container, "pr pointer", {
				[`${styles.horizontal} df center `]: horizontal,
				"dib": !horizontal
			})}
			onClick={() => {
				props[TYPES.SET_SELECTED_PHOTO]({id, selected: !selected})
			}}>

			{selected && !horizontal ? <Svg path={icons.check}
			                 className={cx(styles.check, "pabs")} size="m" fill="#6bd6ef" /> : null}

			<Image className={cx(styles.image, {[styles["hor-image"]]: horizontal})}
			       cloudName={CLOUD}
			       publicId={id}
			       height={horizontal ? "240" : "720"}
			       width={horizontal ? "240" : "720"} crop="scale"/>

			<div className={cx(styles.info, "df", {
				"just-between": !horizontal,
				[`${styles["info-hor"]} just-between`]: horizontal,
			})}>
				<span className={cx(styles.name, "dib")} title={filename}>{filename}</span>
				<span className={cx(styles.dims, "dib")}>{`${width}x${height}`}</span>
			</div>

			<div className={cx(styles.actions, "df pabs",{
				[`${styles["actions-hor"]}`]: horizontal
			})}>
				<Svg className={cx(styles.action)} path={icons.delete} size="xl" fill="#ffffff"/>
			</div>
		</article>
	);
};

export default connect(
	null,
	bindActions,
)(RenderCounter(PhotoItem));

//todo: PureComponent !!!!!!!!!!!!!