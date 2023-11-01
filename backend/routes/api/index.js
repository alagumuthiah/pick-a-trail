const router = require('express').Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./user');
const parksRouter = require('./park');
const trailsRouter = require('./trail');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/parks', parksRouter);

router.use('/trails', trailsRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
