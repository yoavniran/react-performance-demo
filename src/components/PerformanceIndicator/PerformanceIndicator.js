import React, {Component, createRef} from "react";
import cx from "classnames";

import styles from "./PerformanceIndicator.module.scss";

const tick = 100;

const scheduleMonitoring = (callback) => {
	performance.mark("mySetTimeout-start");

	const doMeasure = () => {
		performance.mark("mySetTimeout-end");
		performance.measure("mySetTimeout", "mySetTimeout-start", "mySetTimeout-end");

		const measure = performance.getEntriesByName("mySetTimeout")[0];

		callback((measure.duration - tick));
		// Clean up the stored markers.
		performance.clearMarks();
		performance.clearMeasures();

		performance.mark("mySetTimeout-start"); //start a new mark
	};

	window.__perfHandler = setInterval(doMeasure, tick);
};

const getTickColor = (duration) => {
	let color = "green";

	if (duration > 20 && duration < 50) {
		color = "yellow";
	}
	else if (duration > 50) {
		color = "red";
	}

	return color;
};

const stateInit = Array(5);

class PerformanceIndicator extends Component {

	fillersRefs = Array.apply(null, stateInit).map(createRef);

	state = {
		ticks: Array.apply(null, stateInit).map(() => 1),
	};

	componentDidMount() {
		scheduleMonitoring((duration) => {
			duration = Math.min(Math.max(5, duration), 100);
			const ticks = this.state.ticks;

			ticks.unshift(duration);
			this.setState({ticks: ticks.slice(0, 5)}); //keep the last 5
		});
	}

	render() {
		const ticks = this.state.ticks;

		return (
			<div className={cx(styles.container, "pr", this.props.className)}>
				{this.fillersRefs.map((r, i) =>
					<div className={cx(styles.filler, "pabs")} ref={r} style={{
						left: `${i*10}%`,
						height: `${ticks[i]}%`,
						background: getTickColor(ticks[i])
					}}>
					</div>)}
			</div>
		);
	}
}

export default PerformanceIndicator;