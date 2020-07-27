const express = require('express');
const utils = require('../src/utils/circle');
const User = require('../src/models/user');
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy

const router = express.Router();

const authMiddleware = (req, res, next) => {
    if (!req.isAuthenticated()) {
      res.status(401).send('You are not authenticated')
    } else {
      return next()
    }
}

router.post('/register', (req, res, next) => {
    const newUser = new User(req.body)
    newUser.save().then((data) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) {
              return next(err);
            }
        
            if (!user) {
              return res.status(400).send([user, "Cannot log in", info]);
            }
        
            req.login(user, err => {
                console.log('logged in')
              res.send("Logged in");
            });
        })(req, res, next);
    }).catch((err) => res.json({err}))
})

router.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
          return next(err);
        }
    
        if (!user) {
          return res.status(400).send([user, "Cannot log in", info]);
        }
    
        req.login(user, err => {
          res.send("Logged in");
        });
    })(req, res, next);
})

router.get('/logout', function(req, res) {
    req.logout();
  
    console.log("logged out")
  
    return res.send();
});

router.get('/user', authMiddleware, (req, res) => {
    let user = User.findOne({id: req.session.passport.user})

    res.send({ user: user })
})

passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
  
      function(username, password, done) {
          const self = this
        User.findOne({username: username}, (err, user) => {
        if (user) {
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err
                else if (isMatch) {done(null, user)} else done(null, false, { message: 'Incorrect username or password'})
            })
        } else {
            done(null, false, { message: 'Incorrect username or password'})
        }
        })
      }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    let findUser = User.findOne({id: userId})
    done(null, findUser)
})

module.exports = router;