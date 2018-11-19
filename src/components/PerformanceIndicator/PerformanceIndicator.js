import React, {useEffect, useState, useRef} from "react";
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

	window.__perfHandler = setInterval(doMeasure, tick); //perfHandler isnt componentized !!!!!
};

const getTickColor = (duration) =>
	duration > 20 && duration < 50 ? "yellow" :
		duration > 50 ? "red" : "green";

const stateInit = Array(5);


const PerformanceIndicatorWithHooks = (props) => {
	const fillersRefs = stateInit.fill(null).map(useRef);

	const [ticks, setTicks] = useState(
		Array.apply(null, stateInit).map(() => 1)
	);

	useEffect(() => {
		startMeasure((duration) => {
			duration = Math.min(Math.max(5, duration), 100);

			ticks.unshift(duration); //add the latest
			setTicks(ticks.slice(0, 5));
		});

		return () => {
			clearInterval(window.__perfHandler);
		};
	}, []);

	return (
		<div className={cx(styles.container, "pr", props.className)}>
			{fillersRefs.map((r, i) =>
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
};

export default PerformanceIndicatorWithHooks;
