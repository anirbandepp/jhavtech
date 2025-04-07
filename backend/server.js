const app = require('./gateway/app');

const configure = require('./bootstrap/config.js');
const connectDB = require('./config/Database.js');

const startServer = async () => {

    // Connect database
    await connectDB();

    const PORT = configure.port || 3000;

    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`);
    })
};

startServer();
