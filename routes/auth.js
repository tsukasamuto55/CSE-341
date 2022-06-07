const router = require('express').Router();
const passport = require('passport');

router.get('/logout', (req, res) => {
  res.send('logging out');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.send('Login is successful. You are now in the callback URI');
  }
);

module.exports = router;
