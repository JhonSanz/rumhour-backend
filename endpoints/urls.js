const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

app.use(require('./users/users'));
app.use(require('./users/login'));
app.use(require('./posts/posts'));
app.use(require('./posts/comments'));
app.use(require('./board/board'));


module.exports = app
