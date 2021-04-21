class BL {
    async getSupportedCurrencies() {
        let data = CurrencyCache.getSupportedCurrencies();
        if (!!data) {
            return data;
        }

        const response = await CurrencyAPI.getSupportedCurrencies();
        CurrencyCache.storeSupported(response);
        return response;
    }

    async convert(from, to, amount) {
        let rate = CurrencyCache.getRate(from, to);
        if (rate) {
            console.log('Converting using cached rate: ' + rate);
            return {
                amount: amount * rate,
                exchange_rate: rate
            };
        }

        const response = await CurrencyAPI.getQuote(from, to, amount);
        const { exchange_rate } = response;
        CurrencyCache.storeRate(from, to, exchange_rate);
        console.log('Converted using API: ', response);
        return response;
    }
}
