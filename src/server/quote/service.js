const fs = require('fs/promises');
const path = require('path');

const HttpClient = require('../utils/http-client');
const InMemCache = require('../utils/in-mem-cache');
const CurrencyCache = require('./currency-cache');

class QuoteService {
    cache;

    static SUPPORTED_CURRENCIES_KEY = 'supported_currencies';
    static CURRENCY_KEY_PREFIX = 'currency';

    constructor() {
        this.cache = new CurrencyCache(new InMemCache());
    }

    async getSupported() {
        const cached = this.cache.get(QuoteService.SUPPORTED_CURRENCIES_KEY);
        if (cached) {
            console.log('Read supported from cache');
            return cached;
        }

        const filePath = path.resolve(__dirname, '..', 'supported.json');
        let content, list;
        try {
            content = await fs.readFile(filePath, { encoding: 'utf-8' });
        } catch (e) {
            console.error(e);
            throw new Error('Could not get supported currencies');
        }

        try {
            list = JSON.parse(content);
        } catch (e) {
            console.error(e);
            throw new Error('Could not get supported currencies (Invalid File Content)');
        }

        console.log('Read supported currencies from file');

        this.cache.set(QuoteService.SUPPORTED_CURRENCIES_KEY, list, 259200);
        return list;
    }

    async getQuote(from, to, amount) {
        if (from == null || to == null) {
            throw new Error(`Missing from or to parameters`);
        }
        if (!await this.isSupported(from)) {
            throw new Error(`${from} is not supported`);
        }
        if (!await this.isSupported(to)) {
            throw new Error(`${to} is not supported`);
        }

        const cacheKey = `${QuoteService.CURRENCY_KEY_PREFIX}_${from.toUpperCase()}`;
        const cachedRates = this.cache.get(cacheKey) || {};
        if (cachedRates[to.toUpperCase()] != null) {
            const rate = cachedRates[to.toUpperCase()];
            return {
                exchange_rate: rate,
                currency_code: to.toUpperCase(),
                amount: amount * rate,
                ttl: 300
            };
        }

        let response;
        try {
            response = await HttpClient.get(`https://api.exchangerate-api.com/v4/latest/${from}`);
        } catch (e) {
            throw new Error(`Could not get updated rates: ${e.message}`);
        }

        const rate = response.rates[to.toUpperCase()];
        if (rate == null) {
            throw new Error('Target currency not supported');
        }

        // get seconds to next update
        const next = new Date(response.date);
        next.setUTCDate(next.getUTCDate() + 1);
        const ttl = Math.floor((next.valueOf() - Date.now()) / 1000);

        // cache response
        cachedRates[to.toUpperCase()] = rate;
        this.cache.set(cacheKey, cachedRates, ttl);

        return {
            exchange_rate: rate,
            currency_code: to.toUpperCase(),
            amount: amount * rate,
            ttl
        };
    }

    async isSupported(currencyCode) {
        const supported = await this.getSupported();
        return supported.findIndex(p => p.code === currencyCode) > -1;
    }
}

module.exports = QuoteService;
