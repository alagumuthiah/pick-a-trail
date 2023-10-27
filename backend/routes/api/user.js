const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide avalid email'),
    check('userName')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide firstname'),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide lastname'),
    handleValidationErrors
];

//sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, userName, email, password });

    setTokenCookie(res, user);

    return res.json({
        user
    });
});


module.exports = router;
