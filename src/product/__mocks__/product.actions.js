
const FetchProducts = jest.fn(() => {
  return {
    type: 'product/fetch'
  }
});

export default {
  FetchProducts
}