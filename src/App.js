import React from 'react';
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
				<ProductHome></ProductHome>
			</Provider>
		</div>
	);
}

export default App;
