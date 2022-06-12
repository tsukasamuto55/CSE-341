// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/user');

// const dotenv = require('dotenv');
// dotenv.config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       User.findOne({ googleId: profile.id }).then((currentUser) => {
//         if (currentUser) {
//           console.log(`${currentUser} already exists`);
//           done(null, currentUser);
//         } else {
//           new User({
//             googleId: profile.id,
//             username: profile.displayName,
//             // thumbnail: profile._json.image.url,
//           })
//             .save()
//             .then((newUser) => {
//               console.log('created new user: ', newUser);
//               done(null, newUser);
//             });
//         }
//       });
//     }
//   )
// );
