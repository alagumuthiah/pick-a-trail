import express from 'express';
import { requestBodyValidation } from '../../utils/validation';
import { User } from '../../db/models';
import jwt from 'jsonwebtoken';
const userRoute = express.Router();
import bcrypt from 'bcrypt';
const jwtConfig = require('../../db/config/config').jwtConfig;

userRoute.post('/signup', async (req, res, next) => {
    console.log('inside sign up');
    console.log(req);
    console.log(req.body);
    const error = await requestBodyValidation(req.body, 'userSignUpSchema');
    if (error) {
        res.statusCode = 400;
        let errObj = { "Error": `Validation Error - ${error.message}` };
        res.json(errObj);
    } else {
        const { userName, firstName, lastName, email, password } = req.body;
        console.log(userName, firstName, lastName, email, password);
        const currUser = await User.findOne({ where: { userName: userName }, attributes: ['userName', 'firstName', 'lastName', 'hashedPassword', 'id', 'provider'] });
        if (currUser !== null) {
            res.statusCode = 400;
            console.log('Provider', currUser.provider);
            if (currUser.provider === 'traditional') {
                res.json({ "Error": `User with the username ${currUser.userName} already exist, Login with the userName and password` });
            } else {
                res.json({ "Error": `User with the username ${userName} already exist, you have logged in early using ${currUser.provider}` });
            }

        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, parseInt(jwtConfig.saltRounds));
                const newUser = await User.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    hashedPassword: hashedPassword,
                    provider: 'traditional',
                    followers: [],
                    following: [],
                    isAdmin: false
                });
                const payload = { userName }; //claims to be used to create a JSON token
                const token = jwt.sign(payload, jwtConfig.secret, {
                    expiresIn: jwtConfig.expiresIn
                });

                //res.cookie('token', token);
                res.statusCode = 200;
                res.setHeader("access-token", token);
                let resObj = {
                    "userName": newUser.userName,
                    "firstName": newUser.firstName,
                    "lastName": newUser.lastName,
                    "email": newUser.email,
                    "id": newUser.id
                }
                res.json(resObj);
            }
            catch (error) {
                res.statusCode = 500;
                let errObj = { "Error": `Internal Server Error ${error}` }
                res.json(errObj);
            }
        }
    }
});

userRoute.post('/login', (req, res, next) => {
    res.send('Login Route');
});

userRoute.delete('/logout', (req, res, next) => {
    res.send('Logout');
});

/* Modify the user table to store OAuth info
Eg:When the user logins with OAuth get the details and check if it is already present
Check for email
If present :
    check if it is a OAuth entry and set the userId
    else:
        Not OAuth return error
else:
    create an entry with Oauth flag true and password null
*/

export default userRoute;
