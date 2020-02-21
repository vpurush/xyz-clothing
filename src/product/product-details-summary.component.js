import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { ProductSelector, RelatedProductSelector } from './product.reselect';
import ProductDetails from './product-details.component';
import ProductSummary from './product-summary.component';
import './product-details-summary.scss';

class ProductsDetailsSummary extends React.Component {

    componentDidMount(){
        // URL contains invalid ID
        if(!this.props.product){
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div className="product-details-summary">
                <div className="details">
                    <ProductDetails product={this.props.product}></ProductDetails>
                    &nbsp;<Link className="back-to-catalog" to="/">Back to Product Catalog</Link>
                </div>
                <div className="related-products">
                    <h3>Related Products</h3>
                    <ProductSummary products={this.props.relatedProducts}></ProductSummary>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store, ownProps) => {
    return {
        product: ProductSelector(ownProps.match.params.id)(store, ownProps),
        relatedProducts: RelatedProductSelector(ownProps.match.params.id)(store, ownProps)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductsDetailsSummary));