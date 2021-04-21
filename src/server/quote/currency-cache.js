class CurrencyCache {
    provider;

    constructor(provider) {
        this.provider = provider;
    }

    set(key, value, ttl) {
        this.provider.set(key, value, ttl);
    }

    get(key) {
        return this.provider.get(key);
    }
}

module.exports = CurrencyCache;
