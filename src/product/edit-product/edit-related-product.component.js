import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import './edit-related-product.scss';

class EditRelatedProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.itemSelected = this.itemSelected.bind(this);
    }

    getRelatedItems(){
        if(this.props.relatedProducts){
            return this.props.allProducts
                .filter(p => this.props.relatedProducts.indexOf(p.id) !== -1);
        } else {
            return [];
        }
    }

    itemSelected(e, val){
        if (val) {
            let relatedProducts = [...this.props.relatedProducts, val.id];
            relatedProducts = Array.from(new Set(relatedProducts));
            this.props.itemsModified(relatedProducts);
        }
    }

    removeItem(id){
        let relatedProducts = [...this.props.relatedProducts];
        const idxOfItemToBeRemoved = relatedProducts.indexOf(id);
        relatedProducts.splice(idxOfItemToBeRemoved, 1);
        this.props.itemsModified(relatedProducts);
    }

    render() {
        return (
            <div className="form-row edit-related-product">
                <Autocomplete
                    id="related-products"
                    options={this.props.allProducts}
                    getOptionLabel={option => option.id + " - " + option.name}
                    style={{ width: 300 }}
                    onChange={this.itemSelected} 
                    // value={r}
                    renderInput={params => (
                        <TextField {...params} label="Select Related Items" fullWidth />
                    )}
                    />
                <div className="selected-related-items">
                    {
                        this.getRelatedItems().map(r => {
                            return (
                                <span key={r.id} className="related-product-item">
                                    {r.id + ' - ' + r.name}
                                    <DeleteForeverIcon onClick={this.removeItem.bind(this, r)}></DeleteForeverIcon>
                                </span>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
export default EditRelatedProduct;