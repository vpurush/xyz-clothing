import React from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import ProductActions from './product.actions';
import ProductSummary from './product-summary.component';
import ProductDetailsSummary from './product-details-summary.component';
import EditProduct from './edit-product/edit-product.component';
import {ProductsSelector} from './product.reselect';
import './product-home.scss';

class ProductsHome extends React.Component {

    componentDidMount() {
        this.props.FetchProducts();
    }

    render() {
        return (
            <div className="product-home">
            <Router basename="/products">
                <Switch>
                    <Route exact path="/">
                        <h1>Product Catalog</h1>
                        <h3>We hope that our range of products delights you into purchasing them.</h3>
                        <ProductSummary products={this.props.products}></ProductSummary>
                    </Route>
                    <Route exact path="/:id">
                        <ProductDetailsSummary></ProductDetailsSummary>
                    </Route>
                    <Route exact path="/:id/edit">
                        <EditProduct></EditProduct>
                    </Route>
                </Switch>
            </Router>
            </div>
        );
    }
}

ProductsHome.defaultProps = {
    products: []
}

const mapStateToProps = (store, ownProps) => {
    return {
        products: ProductsSelector(store, ownProps)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProducts: () => dispatch(ProductActions.FetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome);