// *** Third Party Packages
const createHttpError = require("http-errors");

// *** Internal Paclahe
const { performance } = require("perf_hooks");

// *** Import Helpers
const logger = require("../utils/logger");

const checkResponseTime = (req, res, next) => {
    try {
        const start = performance.now(); // Start time

        res.on("finish", () => {
            const end = performance.now(); // End time
            console.log(`${req.method} ${req.originalUrl} - ${Math.round(end - start)}ms`);
        });

        next();
    } catch (error) {
        console.log(error);
        logger.warn("Cache Middleware Error", error);
        const httpError = createHttpError(401, "Failed to create cache");
        return next(httpError);
    }
}

module.exports = checkResponseTime;