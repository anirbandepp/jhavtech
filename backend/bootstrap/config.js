const dotenv = require('dotenv');

dotenv.config();

const _config = {
    port: process.env.PORT,
    databaseUrl: process.env.databaseUrl,
    env: process.env.NODE_ENV,
    frontendDomain: process.env.FRONTEND_DOMAIN,
};

const configure = Object.freeze(_config);

module.exports = configure;