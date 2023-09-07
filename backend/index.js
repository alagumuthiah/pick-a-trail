import express from 'express';
import passport from 'passport';
import sessionRoute from './routes/api/session';
import session from 'express-session';
const app = express();
require('./utils/passport');

app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', sessionRoute);

app.listen(3000, () => {
    console.log('Server listening');
});

/*
 npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,userName:string,email:string,hashedPassword:string,isAdmin:boolean,followers:array:number,following:array:number;

npx sequelize-cli model:generate --name Park --attributes name:string,description:string;

npx sequelize-cli model:generate --name Trail --attributes name:string,length:integer,elevationGain:integer,description:string,images:array:string;

npx sequelize-cli model:generate --name List --attributes privacy:string,trailList:array:integer;

npx sequelize-cli model:generate --name CompletedSavedUserTrail --attributes saved:boolean,completed:boolean;

npx sequelize-cli model:generate --name Review --attributes starsReview:integer,comment:string;

npx sequelize-cli model:generate --name Activity --attributes title:string,message:string,starsReview:integer,likes:array:integer;

npx sequelize-cli model:generate --name Comment --attributes comments:string;

*/