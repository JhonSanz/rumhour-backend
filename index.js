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

mongoose.connect(process.env.URLDB,
    { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            throw err
        }
    });

app.listen(process.env.PORT);
