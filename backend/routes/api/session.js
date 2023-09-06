import express from 'express';
import passport from 'passport';

const sessionRoute = express.Router();

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
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failed'
    })
);

sessionRoute.get('/github',
    passport.authenticate('github', { scope: ['profile'] })
);

sessionRoute.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failed'
    })
);

sessionRoute.get('/facebook',
    passport.authenticate('facebook')
);

sessionRoute.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/auth/login/success',
        failureRedirect: '/auth/login/failed'
    })
);

export default sessionRoute;
