/* Index :D */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./endpoints/urls.js'))

const server = app.listen(process.env.PORT);
const io = require('socket.io').listen(server);
module.exports = io
require('./sockets/sockets')

mongoose.connect(process.env.URLDB,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            throw err
        }
    });
