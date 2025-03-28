const express = require('express');
const cors = require('cors');

const configure = require('../bootstrap/config');
const globalErrorHandler = require('../middlewares/globalErrorHandler');

// *** Import Routes
const employeRouter = require('../routes/employeeRoutes');

const app = express();

app.use(
    cors({
        origin: configure.frontendDomain,
    })
);


app.use(express.json());

// *** Routes
app.get('/', (req, res, next) => {
    return res.json({ msg: "Please refer to API End points" });
});

app.use('/api', employeRouter)

// Global error handler
app.use(globalErrorHandler);

module.exports = app;