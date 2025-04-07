// *** Third Party Packages
const createHttpError = require("http-errors");

// *** Import Configs
const Cache = require("../config/Cache");

// *** Import Helpers
const logger = require("../utils/logger");

// Middleware to check in-memory cache
const checkNodeCache = (req, res, next) => {
    try {
        const key = req.originalUrl;

        const cachedData = Cache.get(key);

        if (cachedData) {
            cachedData.fromCache = true;
            return res.json(cachedData);
        }

        next();
    } catch (error) {
        console.log(error);
        logger.warn("Cache Middleware Error", error);
        const httpError = createHttpError(401, "Failed to create cache");
        return next(httpError);
    }
};

module.exports = checkNodeCache;