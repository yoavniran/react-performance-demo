import React, {Component, createRef} from "react";
import cx from "classnames";

import styles from "./PerformanceIndicator.module.scss";

const tick = 100;

const startMeasure = (callback) => {
	performance.mark("mySetTimeout-start");

	const doMeasure = () => {
		performance.mark("mySetTimeout-end");
		performance.measure("mySetTimeout", "mySetTimeout-start", "mySetTimeout-end");

		const measure = performance.getEntriesByName("mySetTimeout")[0];

		callback((measure.duration - tick));

		performance.clearMarks();
		performance.clearMeasures();
		performance.mark("mySetTimeout-start"); //start a new mark
	};

	window.__perfHandler = setInterval(doMeasure, tick);
};

const getTickColor = (duration) =>
	duration > 20 && duration < 50 ? "yellow" :
		duration > 50 ? "red" : "green";

const stateInit = Array(5);

class PerformanceIndicator extends Component {

	fillersRefs = Array.apply(null, stateInit).map(createRef);

	state = {
		ticks: Array.apply(null, stateInit).map(() => 1),
	};

	componentDidMount() {
		startMeasure((duration) => {
			duration = Math.min(Math.max(5, duration), 100);
			const ticks = this.state.ticks;

			ticks.unshift(duration); //add the latest
			this.setState({ticks: ticks.slice(0, 5)}); //keep the last 5
		});
	}

	render() {
		const ticks = this.state.ticks;

		return (
			<div className={cx(styles.container, "pr", this.props.className)}>
				{this.fillersRefs.map((r, i) =>
					<div key={i}
					     className={cx(styles.filler, "pabs")} ref={r}
					     style={{
						     left: `${i * 10}%`,
						     height: `${ticks[i]}%`,
						     background: getTickColor(ticks[i])
					     }}>
					</div>)}
			</div>
		);
	}
}

export default PerformanceIndicator;