const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

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

//Resource not found Middleware
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});

//Sequelize Error Handler
app.use((err, _req, _res, next) => {
    console.log(err);
    if (err instanceof ValidationError) {
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error';
    }
    next(err);
});

//Error Formatter Error-Handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});


module.exports = app;
