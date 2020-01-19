const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./endpoints/urls.js'))

process.env.PORT = 3000

app.listen(3000, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
