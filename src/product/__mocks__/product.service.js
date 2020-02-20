export const FetchProducts = jest.fn(() => {
    return Promise.resolve([
        {
          id: 1,
          name: 'product-one'
        },
        {
          id: 2,
          name: 'product-two'
        },
        {
          id: 3,
          name: 'product-three'
        }
    ]);
});

export default {
    FetchProducts
};