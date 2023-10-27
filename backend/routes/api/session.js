const express = require('express');
const router = express.Router();
// const passport = require('passport');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password'),
    handleValidationErrors
];

router.get('/', restoreUser, (req, res) => {
    const { user } = req;
    if (user) {
        return res.json({
            user: user.toSafeObject()
        });
    } else {
        return res.json({});
    }
});

//login user using traditional login
router.post(
    '/', validateLogin,
    async (req, res, next) => {
        const { credential, password } = req.body;

        const user = await User.login({ credential, password });

        if (!user) {
            const err = new Error('Login failed');
            err.status = 401;
            err.title = 'Login failed';
            err.errors = ['The provided credentials were invalid.'];
            return next(err);
        }

        setTokenCookie(res, user);

        return res.json({
            user
        });
    }
);

//logout
router.delete('/', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

// router.get('/login/sucess', (req, res, next) => {
//     console.log('Login Sucess');
//     res.send('Login Success');
// });

// router.get('/login/failed', (req, res, next) => {
//     console.log('Login failed');
//     res.send('Login failed');
// });

// router.get('/google',
//     passport.authenticate('google', { scope: ['email', 'profile'] })
// );

// router.get('/google/callback',
//     passport.authenticate('google', {
//         successRedirect: CLIENT_URL,
//         failureRedirect: '/auth/login/failed'
//     })
// );

// router.get('/github',
//     passport.authenticate('github', { scope: ['user:email'] })
// );

// router.get('/github/callback',
//     passport.authenticate('github', {
//         successRedirect: `${CLIENT_URL}/explore`,
//         failureRedirect: '/auth/login/failed'
//     })
// );

// //check how to specify scope to get relevant details from the user based on facebook profile
// router.get('/facebook',
//     passport.authenticate('facebook')
// );

// router.get('/facebook/callback',
//     passport.authenticate('facebook', {
//         successRedirect: `${CLIENT_URL}/explore`,
//         failureRedirect: '/auth/login/failed'
//     })
// );


module.exports = router;
