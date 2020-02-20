import React from 'react';
import ProductCard from './product-card.component';
import './product-summary.scss';

const ProductSummary = (props) => {
    return (
        <div className="product-summary">
            {props.products.map(p => {
                return <ProductCard key={p.id} product={p}></ProductCard>;
            })}
        </div>
    );
}

export default ProductSummary;