const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const api = require('./router/api');
const cookieSession = require('cookie-session');
const passport = require('passport')
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cors())
app.use(cookieSession({
    name: 'mysession',
    keys: ['vueauthrandomkey'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', api);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true)
            //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      //respond with 200
      res.send(200);
    }
    else {
    //move on
      next();
    };
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo connection established successfully');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))