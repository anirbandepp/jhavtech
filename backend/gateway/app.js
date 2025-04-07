// *** Import Third Party Modules
const express = require('express');
const cors = require('cors');

// *** Import Config Module
const configure = require('../bootstrap/config');

// *** Import Routes Gateway
const gateway = require('../routes');

// *** Import Middleware
const checkResponseTime = require('../middlewares/responseTime');
const globalErrorHandler = require('../middlewares/globalErrorHandler');

const app = express();

app.use(
    cors({
        origin: configure.frontendDomain,
    })
);

app.use(express.json());

app.use(checkResponseTime);

// *** Routes
app.get('/', (req, res, next) => res.json({ msg: "Please refer to API End points" }));

app.use('/api', gateway);

// *** Global Error Handler
app.use(globalErrorHandler);

module.exports = app;