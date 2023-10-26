const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev')); //logging information about request and response

app.use(cookieParser());
app.use(express.json());

if (!isProduction) {
    //cors enabled only in development environment as the frontend and backend will be running in different ports
    app.use(cors());
}

//helmet- security middleware - with cross-origin policy it allows images with URL to be rendered
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

//csurf adds a http-only cookie(_csurf) and a method on all requests(req.csrfToken) on all requests
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);

app.use(routes);

module.exports = app;
