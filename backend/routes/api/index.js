const router = require('express').Router();

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const sessionRouter = require('./session');
const usersRouter = require('./user');

// router.get('/set-token-cookie', async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: 'demouser2'
//         }
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// router.get('/restore-user', restoreUser, (req, res) => {
//     return res.json(req.user);
// });

// router.get('/require-auth', requireAuth, (req, res) => {
//     return res.json(req.user);
// });

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});


module.exports = router;
