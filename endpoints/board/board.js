
const express = require('express');
const app = express();

app.get('/board', function(req, res){
    console.log("hello world")
});

module.exports = app
