import express from 'express';
import passport from 'passport';

const sessionRoute = express.Router();
const CLIENT_URL = 'http://localhost:3001';

sessionRoute.get("/", (req, res, next) => {
    res.send('GET URL');
})

sessionRoute.get('/login/success', (req, res, next) => {
    res.send('Login sucess');
})

sessionRoute.get('/login/failed', (req, res, next) => {
    res.send('Login failed');
})

sessionRoute.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

sessionRoute.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/login/failed'
    })
);

sessionRoute.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

sessionRoute.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: `${CLIENT_URL}/explore`,
        failureRedirect: '/auth/login/failed'
    })
);

//check how to specify scope to get relevant details from the user based on facebook profile
sessionRoute.get('/facebook',
    passport.authenticate('facebook')
);

sessionRoute.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: `${CLIENT_URL}/explore`,
        failureRedirect: '/auth/login/failed'
    })
);

export default sessionRoute;
