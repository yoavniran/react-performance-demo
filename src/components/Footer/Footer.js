import React from "react";
import {connect} from "react-redux";
import cx from "classnames";
import {TYPES} from "../../consts";
import boundActions from "../../actions";
import PerformanceIndicator from "../PerformanceIndicator/PerformanceIndicator";

import styles from "./Footer.module.scss";

const PARAMS = {
	PERF: "perf",
	COUNTER: "counter",
};

const STATE = {
	[PARAMS.PERF]: !!~document.location.search.indexOf("perf"),
	[PARAMS.COUNTER]: !!~document.location.search.indexOf("counter"),
};

const toggleParam = (param) => {
	STATE[param] = !STATE[param];
	const loc = document.location;

	document.location = `${loc.protocol}//${loc.host}${loc.pathname}?` +
		Object.values(PARAMS)
			.filter((p) => STATE[p])
			.join("&");
};

const Footer = (props) => (
	<div className={cx(styles.container, "w-100 df center")}>
		{STATE[PARAMS.PERF] ? <div className="h-100 pointer" onClick={() => {
			props[TYPES.TOGGLE_BIG_PERF_INDICATOR]();
		}}>
			<PerformanceIndicator className={styles.perf}/>
		</div> : null}

		<span className={cx(styles.button, "pointer", {[styles.enabled]: STATE[PARAMS.PERF]})}
		      onClick={() => toggleParam(PARAMS.PERF)}>
			perf-indicator
		</span>
		|&nbsp;
		<span className={cx(styles.button, "pointer", {[styles.enabled]: STATE[PARAMS.COUNTER]})}
		      onClick={() => toggleParam(PARAMS.COUNTER)}>
			 render-counter
		</span>
	</div>
);

export default connect(
	null,
	boundActions,
)(Footer);