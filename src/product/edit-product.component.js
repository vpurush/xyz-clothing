import React from 'react';
import { connect } from 'react-redux';
import {
    withRouter
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ProductActions from './product.actions';
import {UnderlyingProductSelector, RelatedProductSelector, ProductsSelector} from './product.reselect';
import './edit-product.scss';

class EditProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isValid: true,
            errors: {
                name: null,
                id: null,
                price: null
            }
        };

        if(this.props.product){
            this.state.name = props.product.name;
            this.state.id = props.product.id;
            this.state.originalId = props.product.id;
            this.state.currency = props.product.price.base;
            this.state.amount = props.product.price.amount;
            this.state.description = props.product.description;
            this.state.relatedProducts = props.product.relatedProducts;
        }

        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    validate(e){
        // console.log("validate", e.target.id, e.target.value)
        const val = e.target.value;
        const errors = {...this.state.errors};
        if (e.target.id == 'name'){
            if(val.length >= 3){
                errors.name = null;
            } else {
                errors.name = 'Length should be greater than 3';
            }
        } else if (e.target.id == 'id'){
            const isIdInvalidValid = this.props.allProducts.some(p =>
                p.id != this.state.originalId &&
                p.id == val
            );

            if(isIdInvalidValid){
                errors.id = "This identifier is already assigned to another product.";
            } else if(val.length == 0){
                errors.id = "You must specify an identifier";
            } else {
                errors.id = null;
            }
        } else if (e.target.id == 'amount'){
            if(val.length == 0){
                errors.amount = "Provide a value";
            } else {
                errors.amount = null;
            }
        }
        this.setState({
            [e.target.id]: val,
            errors
        });
    }

    getRelatedItems(){
        if(this.state.relatedProducts){
            return this.props.allProducts
                .filter(p => this.state.relatedProducts.indexOf(p.id) !== -1)
                // .map(p => p.id + " - " + p.name)
        } else {
            return [];
        }
    }

    save(){
        this.props.SaveProduct(this.state);
        this.props.history.push("/");
    }

    cancel(){
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="edit-product" key={this.props.product}>
                <form noValidate autoComplete="off">
                    <div className="form-row">
                        <TextField 
                            fullWidth
                            error={!!this.state.errors.id} 
                            id="id" 
                            label="ID"
                            type="number"
                            value={this.state.id}
                            onChange={this.validate}
                            helperText={this.state.errors.id || ""} />
                    </div>
                    <div className="form-row">
                        <TextField 
                            fullWidth
                            error={!!this.state.errors.name} 
                            id="name" 
                            label="Name"
                            value={this.state.name}
                            onChange={this.validate}
                            helperText={this.state.errors.name || ""} />
                    </div>
                    <div className="form-row price">
                        <div className="currency">
                            <InputLabel shrink id="product-currency-selector-lbl">
                                Currency
                            </InputLabel>
                            <Select
                                label="product-currency-selector-lbl"
                                id="currency-selector"
                                value={this.state.currency}
                                onChange={this.onCurrencySelection}
                                >
                                {
                                    this.props.currencies.map(c => {
                                        return <MenuItem key={c.base} value={c.base}>{c.base}</MenuItem>;
                                    })
                                }
                            </Select>
                        </div>
                        <div className="amount">
                            <TextField 
                                fullWidth
                                error={!!this.state.errors.amount} 
                                id="amount" 
                                label="Amount"
                                type="number"
                                value={this.state.amount}
                                onChange={this.validate}
                                helperText={this.state.errors.amount || ""} />
                        </div>
                    </div>
                    <div className="form-row">
                        <TextField 
                            multiline
                            fullWidth
                            error={!!this.state.errors.description} 
                            id="description" 
                            label="Description"
                            value={this.state.description}
                            onChange={this.validate}
                            helperText={this.state.errors.description || ""} />
                    </div>
                    <div className="form-row">
                        {this.getRelatedItems().map(r => {
                            return <Autocomplete
                                id="related-products"
                                options={this.props.allProducts}
                                getOptionLabel={option => option.id + " - " + option.name}
                                style={{ width: 300 }}
                                value={r}
                                renderInput={params => (
                                    <TextField {...params} label="Related Items" value={r} fullWidth />
                                )}
                                />
                            })
                        }
                    </div>
                    <div className="form-row buttons">
                        <span>
                            <Button variant="contained" color="primary" onClick={this.save}>
                                Save
                            </Button>
                        </span>
                        <span>
                            <Button variant="contained" color="secondary" onClick={this.cancel}>
                                Cancel
                            </Button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
		currencies: store.common.currencies,
        selectedCurrency: store.common.selectedCurrency,
        allProducts: ProductsSelector(store, ownProps),
        product: UnderlyingProductSelector(ownProps.match.params.id)(store, ownProps),
        relatedProducts: RelatedProductSelector(ownProps.match.params.id)(store, ownProps)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        SaveProduct: product => dispatch(ProductActions.SaveProduct(product))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((props) => {
    return <EditProduct key={props.product} {...props}></EditProduct>
}));