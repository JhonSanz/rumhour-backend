/* Defines users endpoints */

const express = require('express');
const app = express();
const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const ajv = new Ajv();
const User = require('../../models/users/users')
const { verifyApiKey } = require('../../middlewares/api_key')


app.get('/user', [verifyApiKey], (req, res) => {
    res.json({ message: 'Hello get user' })
})

app.post('/user', [verifyApiKey], (req, res) => {
    var schema = {
        "properties": {
            "email": { "type": "string" },
            "password": { "type": "string" }
        },
        "oneOf": [
            { "required": ["email", "password"] },
        ],
    };

    const validate = ajv.compile(schema);
    let valid = validate(req.body);
    if (!valid) return res.status(400).json({ errors: validate.errors })

    let user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        secretKey: Math.random().toString(20)
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario: userDB
        });
    });
})

module.exports = app
