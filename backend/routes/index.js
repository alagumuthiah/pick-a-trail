const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);

router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-Token': csrfToken
    });
})

module.exports = router;

/*
We need to set this CSRF token for the first time
CSRF token is fetched by using the the above API, this sets the XSRF token in the browser by fetching the csrftoken from the request, so that the XSRF token can be used in the subsequent request so that the server identifies it as the legit client who knows the CSRF token
*/
