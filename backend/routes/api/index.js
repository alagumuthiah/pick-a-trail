const router = require('express').Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./user');
const parksRouter = require('./park');
const trailsRouter = require('./trail');
const listsRouter = require('./list');
const reviewsRouter = require('./reviews');
const markedRouter = require('./completedsavedusertrail');
const activityRouter = require('./activity');
const commentRouter = require('./comments');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/parks', parksRouter);

router.use('/trails', trailsRouter);

router.use('/lists', listsRouter);

router.use('/completedsavedtrails', markedRouter);

router.use('/reviews', reviewsRouter);

router.use('/activities', activityRouter);

router.use('/comments', commentRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
