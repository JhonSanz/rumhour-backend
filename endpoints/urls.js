const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.use(require('./users/users'));
app.use(require('./users/login'));
app.use(require('./posts/posts'));
app.use(require('./board/board'));


module.exports = app
