import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import CommonActions from './common/common-actions';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import './app-header.scss';

class AppHeader extends React.Component {
	constructor(props) {
		super(props);

		this.onCurrencySelection = this.onCurrencySelection.bind(this);
	}

	componentDidMount() {
		this.props.FetchCurrency();
	}

	onCurrencySelection(event) {
		const selectedCurrencyObj = this.props.currencies.find(c => c.base == event.target.value);
		// console.log("selectedCurrencyObj", selectedCurrencyObj)
		this.props.SelectCurrency(selectedCurrencyObj);
	}

	render() {
		return (
			<header className="app-header">
				<span className="name">XYZ Clothing</span>
				<div className="currency-selector">
					<InputLabel id="currency-selector-lbl">Select Currency</InputLabel>
					<Select
						labelId="currency-selector-lbl"
						id="currency-selector"
						value={this.props.selectedCurrency ? this.props.selectedCurrency.base : 'USD'}
						onChange={this.onCurrencySelection}
					>
						{
							this.props.currencies.map(c => {
								return <MenuItem key={c.base} value={c.base}>{c.base}</MenuItem>;
							})
						}
					</Select>
				</div>
			</header>
		);
	}
}

const mapStateToProps = (store, ownProps) => {
	return {
		currencies: store.common.currencies,
		selectedCurrency: store.common.selectedCurrency
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		FetchCurrency: () => dispatch(CommonActions.FetchCurrency()),
		SelectCurrency: (val) => dispatch(CommonActions.SelectCurrency(val))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
