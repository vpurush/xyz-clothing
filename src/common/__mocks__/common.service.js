export const FetchCurrencies = jest.fn(() => {
    return Promise.resolve([
        {
          "base": "AUD",
          "rates": {
            "USD": 0.72,
            "CNY": 4.87
          }
        }
    ]);
});

export default {
    FetchCurrencies
};