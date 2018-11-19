import React,{StrictMode} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import getStore from "./store/store";
import App from "./components/App/App";
import "./index.scss";

const store = getStore();

window.__store = store;

ReactDOM.render(
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>,
	document.getElementById("root"));