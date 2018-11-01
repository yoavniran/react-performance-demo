import React, {Fragment} from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {Image} from "cloudinary-react";
import {CLOUD} from "../../consts";
import RenderCounter from "../RenderCounter/RenderCounter";
import {selectExposedPhoto} from "./PhotoView.selectors";

import styles from "./PhotoView.module.scss";

const PhotoView = (props) => (
	<section className={cx(styles.container, "w-100", {
		"df center just-center": !props.photo,
	})}>
		{props.photo ?
			<Fragment>
				<Image className={cx(styles.image)}
				       cloudName={CLOUD} publicId={props.photo.id}
				       quality="auto"
				       fetchFormat="auto"
				       crop="limit"
				       height="1600">
				</Image>

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