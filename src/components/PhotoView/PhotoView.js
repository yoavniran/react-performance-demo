import React, {Fragment} from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {Image} from "cloudinary-react";
import {CLOUD} from "../../consts";
import {selectExposedPhoto} from "./PhotoView.selectors";

import styles from "./PhotoView.module.scss";
import RenderCounter from "../RenderCounter/RenderCounter";

const PhotoView = (props) => (
	<section className={cx(styles.container, "w-100", {
		"df center just-center": !props.photo,
	})}>
		{props.photo ?
			<Fragment>
				<Image className={cx(styles.image)}
				       cloudName={CLOUD} publicId={props.photo.id} responsive={true}/>
				<span className={cx(styles.price, "pabs")}>
					${props.photo.price}
				</span>
			</Fragment> :
			<div className={cx(styles.text)}>
				No Photo Selected
			</div>}
	</section>
);

export default connect(
	(state) => ({
		photo: selectExposedPhoto(state),
	}),
	null,
)(RenderCounter(PhotoView, () => ({style: {flexGrow: 2, display: "flex"}})));