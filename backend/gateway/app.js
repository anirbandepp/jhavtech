const express = require('express');
const cors = require('cors');

const configure = require('../bootstrap/config');
const globalErrorHandler = require('../middlewares/globalErrorHandler');

// *** Import Routes Gateway
const gateway = require('../routes');

const app = express();

app.use(
    cors({
        origin: configure.frontendDomain,
    })
);

app.use(express.json());

// *** Routes
app.get('/', (req, res, next) => res.json({ msg: "Please refer to API End points" }));

app.use('/api', gateway);

// *** Global Error Handler
app.use(globalErrorHandler);

module.exports = app;