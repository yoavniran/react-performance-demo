import React from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {Image} from "cloudinary-react";
import {CLOUD} from "../../consts";
import {selectExposedPhoto} from "./ImageExpose.selectors";

import styles from "./ImageExpose.module.scss";

const ImageExpose = (props) => (
	<section className={cx(styles.container, "w-100 h-100")}>
		{props.photo ?
			<Image className={cx(styles.image)}
				cloudName={CLOUD} publicId={props.photo.id} responsive={true}/> :
		<div>
			No Photo Selected
		</div>}
	</section>
);

export default connect(
	(state) => ({
		photo: selectExposedPhoto(state),
	}),
	null,
)(ImageExpose);