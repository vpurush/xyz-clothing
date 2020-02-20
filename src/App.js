import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
	Route,
	Redirect
} from "react-router-dom";
import {Provider} from 'react-redux';
import logo from './logo.svg';
import './App.css';
import AppStore from './app-store';
import ProductHome from './product/product-home.component';

function App() {
	return (
		<div className="App">
			<Provider store={AppStore}>
				<header className="App-header">
					XYZ Clothing
				</header>
				<Router>
					<Switch>
						<Route path="/products">
							<ProductHome></ProductHome>
						</Route>
						<Redirect exact from="*" to="/products" />
					</Switch>
				</Router>
			</Provider>
		</div>
	);
}

export default App;
