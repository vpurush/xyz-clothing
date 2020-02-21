import React from 'react';
import './product-details.scss';
import {Link} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';

const ProductDetails = (props) => {
    return (
        props.product ? 
        <div className="product-details">
            <h1 className="product-name">
                {props.product.name}
                <Link to={"/" + props.product.id + "/edit"}>
                    <EditIcon></EditIcon>
                </Link>
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