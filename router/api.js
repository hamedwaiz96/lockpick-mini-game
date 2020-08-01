const express = require('express');
const User = require('../src/models/user');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const JWTStrategy = passportJWT.Strategy;

const secret = "12345";

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
    const userDocument = await User.findOne({username: username}).exec();
    userDocument.comparePassword(password, (err, isMatch) => {
      console.log(isMatch)
      if (isMatch) {
        return done(null, userDocument);
      } else if (err) {
        return done(err);
      } else {
        return done('Incorrect Username / Password')
      }
    })
}));

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: secret,
  },
  (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done('jwt expired');
    }

    return done(null, jwtPayload);
  }
));

const router = express.Router();

router.post('/register', (req, res) => {
    const newUser = new User(req.body)
    newUser.save().then((user) => {
      let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });
    }).catch((err) => {
      res.status(400).json({err: err})
    })
})

router.post('/login', (req, res) => {
    // find user from req.body.username and then compare password
    passport.authenticate(
      'local',
      { session: false },
      (error, user) => {
        if (error || !user) {
          res.status(400).json({ error });
        }
        /** This is what ends up in our JWT */
        const expiration_ms = 1000 * 60 * 60 * 24;
        const payload = {
          id: user.id,
          expires: Date.now() + parseInt(expiration_ms),
        };
        /** assigns payload to req.user */
        req.login(payload, {session: false}, (error) => {
          if (error) {
            res.status(400).send({ error });
          }
          /** generate a signed json web token and return it in the response */
          const token = jwt.sign(JSON.stringify(payload), secret);
          /** assign our jwt to the cookie */
          res.cookie('jwt', token, { httpOnly: true });
          res.status(200).send({ auth: true, token: token, user: user });
        });
      },
    )(req, res);
})

router.get('/logout', function(req, res) {
  
    console.log("logged out")
  
    return res.json({message: "successfully logged out"});
});

router.get('/user', (req, res) => {
  res.json({user: req.cookies.jwt})
})

module.exports = router;