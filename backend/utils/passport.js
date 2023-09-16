require('dotenv').config();
import { User } from '../db/models';

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
import passport from 'passport';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;


passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback"
        },
        async function (accessToken, refreshToken, profile, done) {
            let email = profile.emails[0].value;
            const currUser = await User.findOne({ where: { email: email }, attributes: ['userName', 'firstName', 'lastName', 'hashedPassword', 'id', 'provider'] });
            if (currUser && currUser.provider === 'google') {
                console.log('Logged in');
                done(null, currUser);
            } else if (currUser && currUser.provider !== 'google') {
                console.log('already logged in using different oauth service');
                done(`You have already logged in using different authentication service.`, null);
            } else {
                console.log('No user exist , so create an entry');
                let userName = profile.displayName;
                let firstName = profile.name.givenName;
                let lastName = profile.name.familyName;
                let provider = profile.provider;
                const newUser = await User.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    isAdmin: false,
                    provider: provider,
                    followers: [],
                    following: []
                });
                done(null, newUser);
            }
            // done(null, profile);
        }

    )
);

passport.use(
    new GitHubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback"
        },
        async function (accessToken, refreshToken, profile, done) {
            // User.findOrCreate({ githubId: profile.id }, function (err, user) {
            //     return done(err, user);
            // });
            let options = {
                method: 'GET',
                headers: {
                    "Authorization": `token ${accessToken}`
                }
            }
            const result = await fetch("https://api.github.com/user/emails", options);
            const emailData = await result.json();
            let primaryEmail = emailData.filter((email) => email.primary === true)
            console.log(primaryEmail[0].email);
            console.log(profile.displayName);
            console.log(profile.username);
            console.log(profile.provider);
            let email = primaryEmail[0].email;
            const currUser = await User.findOne({ where: { email: email }, attributes: ['userName', 'firstName', 'lastName', 'hashedPassword', 'id', 'provider'] });
            if (currUser && currUser.provider === 'github') {
                console.log('Logged in github');
                done(null, currUser);
            } else if (currUser && currUser.provider !== 'github') {
                console.log('already logged in using different oauth service');
                done(`You have already logged in using different authentication service.`, null);
            } else {
                console.log('No user exist , so create an entry');
                let userName = profile.username;
                let firstName = profile.displayName;
                let provider = profile.provider;
                const newUser = await User.create({
                    userName: userName,
                    firstName: firstName,
                    email: email,
                    provider: provider,
                    isAdmin: false,
                    followers: [],
                    following: []
                });
                done(null, newUser);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: "/auth/facebook/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('facebook');
            console.log(profile);
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});





/*
1. Get the client id and secret from env
2. install the dependencies
3. Create passport.js file that creates all strategies
4. Create a route file with OAuth routes - success anf failure redirect
5. express-session to maintain session across refresh
6. When a user logs in, what has to be store in the database?
7. How to facilitate the normal login without using OAuth services
*/
