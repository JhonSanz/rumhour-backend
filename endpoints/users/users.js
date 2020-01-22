/* Defines users endpoints */

const express = require('express');
const app = express();
const Ajv = require('ajv');
const ajv = new Ajv();
const User = require('../../models/users/users')
const { verifyApiKey } = require('../../middlewares/api_key')


app.get('/user', verifyApiKey, (req, res) => {
    res.json({ message: 'Hello get user' })
})

app.post('/user', verifyApiKey, (req, res) => {
    var schema = {
        "properties": {
            "username": { "type": "string" },
            "password": { "type": "string" }
        },
        "oneOf": [
            { "required": ["username", "password"] },
        ]
    };

    const validate = ajv.compile(schema);
    let valid = validate(req.body);
    if (!valid) return res.status(400).json({ errors: validate.errors })

    let user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    user.save((err, db_user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario: db_user
        });
    });
})

module.exports = app
