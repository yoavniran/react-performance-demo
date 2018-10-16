import React  from "react";
import cx from "classnames";
import {connect} from "react-redux";
import {VIEW_STATES} from "../../consts";
import {selectViewState} from "../../selectors";
import SelectionView from "../SelectionView/SelectionView";
import RenderCounter from "../RenderCounter/RenderCounter";
import ImageExpose from "../ImageExpose/ImageExpose";

import styles from "./App.module.scss";

const App = (props) => (
	<div className={cx(styles.container, "df flex-col")}>
		<SelectionView viewState={props.viewState}/>

		{props.viewState === VIEW_STATES.MINIFIED ?
			<ImageExpose />: null}
	</div>
);

//todo: !!!!!!!!!!!!!!!!! selecting (viewState) state from store in high-level comp

export default connect(
	(state)=>({
		viewState: selectViewState(state),
	}),
	null
)(RenderCounter(App));
// export default App;
