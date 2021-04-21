const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

var quoteApi = require('./quote/api');

app.use('/api/quote', quoteApi);

const clientDir = path.join(__dirname, '../client');
app.use('/', express.static(clientDir));

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send('Unexpected error');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});