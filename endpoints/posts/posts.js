const express = require('express');
const app = express();

app.get('/post', (req, res) => {
    res.json({message: 'Hello post'})
})

module.exports = app
