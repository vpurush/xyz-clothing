import React from 'react';
import './product-details.scss';

const ProductDetails = (props) => {
    return (
        props.product ? 
        <div className="product-details">
            <h1 className="product-name">
                {props.product.name}
            </h1>
            <span className="product-price">
                {props.product.price.amount}
                <span className="product-price-currency">
                    &nbsp;{props.product.price.base}
                </span>
            </span>
            <p className="product-desc">
                {props.product.description}
            </p>
        </div>
        : null
    );
}

export default ProductDetails;