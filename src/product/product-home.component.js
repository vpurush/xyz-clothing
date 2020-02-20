import React from 'react';
import {connect} from 'react-redux';
import ProductActions from './product.actions';

class ProductsHome extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.FetchProducts();
    }

    render(){
        return <div>
            Product Home Page
            {this.props.products.map(p => {
                return JSON.stringify(p);
            })}
        </div>;
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