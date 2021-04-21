class CurrencyAPI {
    static async getSupportedCurrencies() {
        const response = await fetch('/api/quote/supported');
        const res = await response.json();
        if (response.ok) {
            return res;
        }

        throw new Error(res.error);
    }

    static async getQuote(from, to, amount) {
        const response = await fetch(`/api/quote?from_currency_code=${from}&to_currency_code=${to}&amount=${amount}`);
        const res = await response.json();
        if (response.ok) {
            return res;
        }

        throw new Error(res.error);
    }
}
