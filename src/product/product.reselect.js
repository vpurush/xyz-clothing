import { createSelector } from 'reselect'

export const ProductsSelector = createSelector(
    state => state.products,
    state => state.common.selectedCurrency,
    state => state.common.currencies,
    (products, selectedCurrency, allCurrencies) => {
        // console.log("selectedCurrency", selectedCurrency);
        const mappedProducts = products.map(p => {
            const product = {...p};

            const productCurrency = allCurrencies.find(c => c.base == p.price.base);

            if (productCurrency && selectedCurrency) {
                let multiplier = 1;
                if (productCurrency.base != selectedCurrency.base){
                    multiplier = productCurrency.rates[selectedCurrency.base];
                }
                product.price = {
                    base: selectedCurrency.base,
                    amount: (p.price.amount * multiplier).toFixed(2)
                }
            }
            return product;
        });
        return mappedProducts;
    }
);

export const ProductSelector = (productId) => {
    return createSelector(
        ProductsSelector,
        (products) => {
            const product = products.find(p => p.id == productId);
            return product;
        }
    );
}

export const UnderlyingProductSelector = (productId) => {
    return createSelector(
        state => state.products,
        (products) => {
            const product = products.find(p => p.id == productId);
            return product;
        }
    );
}

export const RelatedProductSelector = (productId) => {
    return createSelector(
        ProductsSelector,
        ProductSelector(productId),
        (products, product) => {
            const relatedProducts = products.filter(p => product.relatedProducts.indexOf(p.id) != -1);
            return relatedProducts;
        }
    );
}
