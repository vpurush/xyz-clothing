import React from 'react';
import {connect} from 'react-redux';

const ProductsHome = (props) => {
    return <div>
        Product Home Page
        {props.products.map(p => {
            return JSON.stringify(p);
        })}
    </div>;
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
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsHome);