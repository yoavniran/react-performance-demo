import React from "react";
import cx from "classnames";
import loaderImg from "../../assets/images/loader.svg";
import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = ({className, size}) =>
	<div className={cx(styles.container, "df center just-center", className)}>
		<img width={size || "100"} height={size ||"100"} src={loaderImg} />
	</div>;

export default LoadingIndicator;
