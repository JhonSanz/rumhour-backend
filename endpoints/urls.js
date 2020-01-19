const express = require('express');
const app = express();

app.use(require('./users/users'));
app.use(require('./posts/posts'));


module.exports = app
