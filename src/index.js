import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/tachyons.css'
import Home from './containers/Home'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Store from './reducers'
const initialState = {};
const store = Store(initialState);
const Main = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Route exact={true} path="/" component={Home} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
