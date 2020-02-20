import React from 'react';
import './product-card.scss';
import {Link} from 'react-router-dom';

const ProductCard = (props) => {
    return (
        <Link to={"/" + props.product.id}>
            <div className="product-card">
                <h3 className="product-name">
                    {props.product.name}
                </h3>
                <span className="product-price">
                    {props.product.price.amount}
                    <span className="product-price-currency">
                        &nbsp;{props.product.price.base}
                    </span>
                </span>
            </div>
        </Link>
    );
}

export default ProductCard;