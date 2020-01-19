const express = require('express');
const app = express();
var Ajv = require('ajv');
var ajv = new Ajv();


app.get('/user', (req, res) => {
    res.json({ message: 'Hello get user' })
})

app.post('/user', (req, res) => {
    var schema = {
        "properties": {
            "username": { "type": "string" },
            "password": { "type": "string" }
        },
        "oneOf": [
            { "required": ["username", "password"] },
        ]
    };

    var validate = ajv.compile(schema);
    var valid = validate(req.body);
    if (!valid) res.json({ errors: validate.errors })

    res.json({ message: 'Hello post user' })
})

module.exports = app
