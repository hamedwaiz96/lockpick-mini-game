const express = require('express')
const app = express()
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const api = require('./router/api');
const cors = require('cors')

require('dotenv').config();

app.use(express.json());
app.use(cors())
const publicRoot = path.join(__dirname, './client/dist')

app.use(express.static(publicRoot))
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

app.get("/", (req, res, next) => {
  res.sendFile("index.html", { root: publicRoot })
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo connection established successfully');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))