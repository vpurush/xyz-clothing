import ProductService from '../product.service';

jest.mock('request', () => {
  return jest.fn((options, callback) => {
    const body = [
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
    ];
    callback(null, null, JSON.stringify(body));
  })
});

test('GetImages method must return list of images', (done) => {
    ProductService.FetchProducts().then((products) => {
        expect(products.length).toEqual(3);
        done();
    });
});