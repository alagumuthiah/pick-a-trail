const router = require('express').Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./user');
const parksRouter = require('./park');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/parks', parksRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
