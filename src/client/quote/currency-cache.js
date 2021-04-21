class CurrencyCache {
    static CURRENCY_LIST_KEY = 'currency_list';
    static CURRENCY_RATES_KEY = 'currency_rates';

    static getRate(from, to) {
        try {
            const storedRates = localStorage.getItem(CurrencyCache.CURRENCY_RATES_KEY);
            if (!storedRates) {
                return null;
            }

            const rates = JSON.parse(storedRates);
            const base = rates[from];
            if (!base) {
                return null;
            }

            const toRate = base[to];
            if (!toRate) {
                return null;
            }

            if (toRate.validUntil < Date.now()) {
                return null;
                // no need to remove outdated key because the
                // following request will update it
            }

            return toRate.value;
        } catch (e) {
            return null;
        }
    }

    static getSupportedCurrencies() {
        try {
            const cached = localStorage.getItem(CurrencyCache.CURRENCY_LIST_KEY);
            if (!cached) {
                return null;
            }

            const data = JSON.parse(cached);

            if (data.validUntil < Date.now()) {
                return null;
                // no need to remove outdated key because the
                // following request will update it
            }

            return data.value;
        } catch (e) {
            return null;
        }
    }

    static storeSupported(list) {
        try {
            const validUntil = this.getExpirationDate(3);
            const obj = { value: list, validUntil };
            localStorage.setItem(CurrencyCache.CURRENCY_LIST_KEY, JSON.stringify(obj));
        } catch (e) {
            // do nothing... 
        }
    }

    static storeRate(from, to, rate) {
        const storedRates = JSON.parse(localStorage.getItem(CurrencyCache.CURRENCY_RATES_KEY) || '{}');
        const validUntil = this.getExpirationDate(1);
        const newData = { [to]: { value: rate, validUntil } };
        storedRates[from] = { ...storedRates[from], ...newData };
        localStorage.setItem(CurrencyCache.CURRENCY_RATES_KEY, JSON.stringify(storedRates));
    }

    static getExpirationDate(days) {
        const d = new Date();
        d.setUTCDate(d.getUTCDate() + days);
        d.setUTCHours(0, 0, 0, 0);
        return d.valueOf();
    }
}
