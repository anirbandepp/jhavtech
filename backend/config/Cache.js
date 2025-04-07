const NodeCache = require("node-cache");

const Cache = new NodeCache({ stdTTL: 60 }); // In-memory cache (1 min)

module.exports = Cache;