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
import './product-home.scss';

class ProductsHome extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <Route path="/:id">
                        <ProductDetailsSummary></ProductDetailsSummary>
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
        products: store.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchProducts: () => dispatch(ProductActions.FetchProducts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome);