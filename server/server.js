require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const express = require('express');
const connectToDb = require('./database/db');
const homeRoute = require('./routes/homeRoute');
const signUpRoute = require('./routes/signUpRoute');
const pathLogger = require('./middlewares/pathLogger');
const errorHandler = require('./middlewares/errorHandler');
const unknownRouteHandler = require('./middlewares/unknownRouteHandler');

const startApp = async () => {
    try {
        await connectToDb('MyApp');
        const app = express();

        // middlewares
        app.use(cors());
        app.use(pathLogger);
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use('/', homeRoute);
        app.use('/api', signUpRoute);

        app.use(unknownRouteHandler);
        app.use(errorHandler);

        app.listen(PORT, () => console.log('Server listening on port:', PORT));
    } catch (e) {
        console.error('Error starting the server:', e.message);
        process.exit(1);
    }
};

startApp();