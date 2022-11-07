const express = require('express');
const session = require('express-session');
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();
const multer = require('multer');
require('dotenv').config();
const { clearCache } = require('ejs');
const app = express();
const axios = require('axios').default;

const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const cookieParser = require('cookie-parser');
const router = require('./routes/routes')
const config = require('./config');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    cb(null, `${file.fieldname}-${uniqueSuffix}.png`)
  },
})
const upload = multer({ storage })
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(upload.array('photos'));
app.use('/node', express.static(__dirname + '/node_modules'));
app.use(express.static('public'));

const options = {
  host: process.env.DB_HOST,
  port: process.env.PORT,
  client: redisClient,
};

// session_store
//session_store
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    path: "/",
    key: "user_cookies",
    secret: "keyboard_cat",
    resave: false,
    store: new redisStore(options),
    saveUninitialized: true,
    cookie: { expires: 5000000000 * 50 },
  })
);


// Facebook auth
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser(async (obj, cb) => {
  cb(null, obj);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL,
      profileFields: config.facebookAuth.profileFields,
    },
    ((req, accessToken, refreshToken, profile, done) => {
      const accessTkn = refreshToken.access_token;

      // console.log(profile);
      const newUser = {
        id: profile.id,

        familyName: profile.name.familyName,
        givenName: profile.name.givenName,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: (profile.emails[0].value || '').toLowerCase(),
        photos: profile.photos,
        token: accessTkn,
      };

      const picture = `https://graph.facebook.com/${profile.id}/picture?width=300&height=300&access_token=${accessTkn}`;
      // console.log(picture);
      return done(null, newUser);
    }),
  ),
);
// Google AUthentication

passport.use(
  new GoogleStrategy(
    {
      clientID: config.googleAuth.clientID,
      clientSecret: config.googleAuth.clientSecret,
      callbackURL: config.googleAuth.callbackURL,
      passReqToCallback: true,
    },
    ((request, accessToken, refreshToken, profile, done) => {
      // console.log(profile);
      const user = {
        id: profile.id,

        familyName: profile.name.familyName,
        givenName: profile.name.givenName,
        name: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.email,
        photos: profile.photos,
        token: accessToken,
      };

      return done(null, user);
    }),
  ),
);

app.use(router);

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening at http://127.0.0.1:${process.env.PORT}`);
  console.log(process.env.Token);
});

module.exports = app;