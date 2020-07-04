/**
* @file Users endpoints definition
*/

const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../../models/users/users')
const { verifyApiKey } = require('../../middlewares/api_key')
const ajv = new Ajv();
const app = express();

app.get('/user', [verifyApiKey], (req, res) => {
    res.json({ message: 'Hello get user' })
})


/**
* Signing up within rumhour app.
* @return {JSON} Signed up user or error.
*/
app.post('/user', [verifyApiKey], async (req, res) => {
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

    user = await user.save()
        .catch(err => {
            return res.status(400).json({
                ok: false,
                err
            })
        })

    return res.json({
        ok: true,
        user: user
    });
})

module.exports = app
