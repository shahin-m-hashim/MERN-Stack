require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT;
const express = require('express');
const connectToDb = require('./database/db');
const cookieParser = require('cookie-parser');
const homeRoute = require('./routes/homeRoute');
const loginRoute = require('./routes/loginRoute');
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
        app.use(cookieParser());
        app.use(express.urlencoded({ extended: true }));

        app.use('/', homeRoute);

        app.use('/api', [
            signUpRoute,
            loginRoute,
        ]);

        // a simple example of setting cookies
        app.get('/setCookies', (req, res) => {
            // set two simple cookies which will expire after 30 seconds.
            res.setHeader('Set-Cookie', [`name=John; Max-Age=30`, `age=30; Max-Age=30`]);
            res.send('Cookies have been set');
        })

        app.get('/readCookies', (req, res) => {
            const cookies = req.cookies;
            console.log(cookies);
            res.send(cookies);
        })

        app.get('/clearCookies', (req, res) => {
            res.setHeader('Set-Cookie', [`name=John; Max-Age=0`, `age=30; Max-Age=0`]);
            res.send('Cookies have been cleared');
        })

        /*
            Once a cookie is set, it can be accessed from any route within the same domain, and its 
            access can be further controlled by setting the domain and path attributes of the cookie.
        */

        app.use(unknownRouteHandler);
        app.use(errorHandler);

        app.listen(PORT, () => console.log('Server listening on port:', PORT));
    } catch (e) {
        console.error('Error starting the server:', e.message);
        process.exit(1);
    }
};

startApp();