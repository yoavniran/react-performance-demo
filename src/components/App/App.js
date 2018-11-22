import React, {lazy, Suspense}  from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {VIEW_STATES} from "../../consts";
import {selectBigPerfIndicator, selectViewState} from "../../selectors";
import SelectionView from "../SelectionView/SelectionView";
import RenderCounter from "../RenderCounter/RenderCounter";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";
import Footer from "../Footer/Footer";
import PerformanceIndicator from "../PerformanceIndicator/PerformanceIndicator";

import styles from "./App.module.scss";

const PhotoView = lazy(() =>
	new Promise((resolve) => {
		setTimeout(() => //exaggerate the time it takes to lazy load so fallback is shown !!!
			resolve(import('../PhotoView/PhotoView')), 2000)
	}));


const App = (props) => (
	<div className={cx(styles.container, "df flex-col")}>
		<SelectionView viewState={props.viewState}/>

		{props.viewState === VIEW_STATES.MINIFIED ?
			<Suspense fallback={
				<LoadingIndicator/>
			}>
				<PhotoView />
			</Suspense>
			: null}

		<Footer/>

		{props.bigIndicator ?
			<div className={cx(styles["perf-container"])}>
				<PerformanceIndicator className={styles.perf}/>
			</div>
			: null}
	</div>
);

export default connect(
	(state)=>({
		viewState: selectViewState(state),
		bigIndicator: selectBigPerfIndicator(state),
	}),
	null
)(RenderCounter(App));
