import React, {Component} from "react";
import cx from "classnames";

import styles from "./RenderCounter.module.scss";

const showCounter = ~document.location.search.indexOf("counter");

export default (Comp) => {

	if (process.env.NODE_ENV === "production") {
		console.error("RenderCounter - No! don't use me in Production !!!!!!!!!");
	}

	return class RenderCounter extends Component {

		state = {count: 0};

		static getDerivedStateFromProps(props, state) {
			return {
				count: (state.count + 1),
			};
		}

		render() {
			return <div className={cx(styles.container, {"render-counter pr": showCounter})}
			            data-count={this.state.count}>
				<Comp {...this.props}/>

				<span className={cx(styles.counter, "pabs", {"hidden": !showCounter})}>
					{this.state.count}
				</span>
			</div>
		}
	}
}