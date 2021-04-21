const express = require('express');
const router = express.Router();
const QuoteService = require('./service');

const service = new QuoteService();

router.get('/supported', async function (req, res, next) {
    try {
        const response = await service.getSupported();
        res.json(response);
    } catch (e) {
        next(e);
    }
});

router.get('/', async function (req, res, next) {
    const { from_currency_code, to_currency_code, amount } = req.query;
    try {
        const response = await service.getQuote(from_currency_code, to_currency_code, amount);
        res.setHeader('max-age', response.ttl);
        const { ttl, ...data } = response;
        res.json(data);
    } catch (e) {
        next(e);
    }
});

router.use(function (err, req, res, next) {
    res.status(400);
    res.json({ error: err.message });
});

module.exports = router;
