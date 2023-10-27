const express = require('express');
const router = express.Router();

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

//sign up
router.post('/', async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const user = await User.signup({ firstName, lastName, userName, email, password });

    setTokenCookie(res, user);

    return res.json({
        user
    });
});


module.exports = router;
