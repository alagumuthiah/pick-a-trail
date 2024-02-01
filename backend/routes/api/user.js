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


//get list of all users
router.get('/', async (req, res) => {
    const users = await User.findAll();
    console.log(users);
    return res.json({
        users
    });
})


//sign up
router.post('/', validateSignup, async (req, res) => {
    const { firstName, lastName, userName, email, password, location } = req.body;
    const user = await User.signup({ firstName, lastName, userName, email, password, location });

    setTokenCookie(res, user);

    return res.json({
        user
    });
});

router.get('/:userId', async (req, res) => {
    const users = await User.findByPk(req.params.userId);
    console.log(users);
    return res.json(users);
})

router.get('/:userId/followers', async (req, res) => {
    const users = await User.findByPk(req.params.userId);
    console.log(users.followers);
    let followersList = [];
    return res.json(users.followers);
});

router.get('/:userId/following', async (req, res) => {
    const users = await User.findByPk(req.params.userId);
    console.log(users.following);
    let followingList = [];
    return res.json(users.following);
});

module.exports = router;
