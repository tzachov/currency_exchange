class InMemCache {
    data = {};

    set(key, value, ttl) {
        const d = new Date();
        const validUntil = d.valueOf() + ttl * 1000;
        this.data[key] = { value, validUntil };
    }

    get(key) {
        const cached = this.data[key];
        if (!cached) {
            return null;
        }

        const d = new Date(); 
        if (d.valueOf() > cached.validUntil) {
            return null;
        }

        return cached.value;
    }
}

module.exports = InMemCache;
