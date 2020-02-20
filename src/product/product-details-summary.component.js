import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSelector } from 'reselect'
import ProductDetails from './product-details.component';
import ProductSummary from './product-summary.component';
import './product-details-summary.scss';

class ProductsDetailsSummary extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-details-summary">
                <div className="details">
                    <ProductDetails product={this.props.product}></ProductDetails>
                </div>
                <div className="related-products">
                    <h3>Related Products</h3>
                    <ProductSummary products={this.props.relatedProducts}></ProductSummary>
                </div>
            </div>
        );
    }
}

const productSelector = (productId) => {
    return createSelector(
        state => state.products,
        (products) => {
            const product = products.find(p => p.id == productId);
            return product;
        }
    );
}

const relatedProductSelector = (productId) => {
    return createSelector(
        state => state.products,
        productSelector(productId),
        (products, product) => {
            const relatedProducts = products.filter(p => product.relatedProducts.indexOf(p.id) != -1);
            return relatedProducts;
        }
    );
}

const mapStateToProps = (store, ownProps) => {
    return {
        product: productSelector(ownProps.match.params.id)(store, ownProps),
        relatedProducts: relatedProductSelector(ownProps.match.params.id)(store, ownProps)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsDetailsSummary));