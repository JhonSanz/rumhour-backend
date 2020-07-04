/**
* @file Authentication endpoints definition
*/

const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../../models/users/users');
const ajv = new Ajv();
const app = express();

dotenv.config();

/**
* Signing in rumhour app.
* @return {JSON} Signed in user or error.
*/
app.post('/login', async (req, res) => {
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

    let userFound = await user.findOne({ email: req.body.email })
        .catch(err => res.status(500).json({ ok: false, err }))

    if (!userFound || !bcrypt.compareSync(req.body.password, userFound.password))
        return res.status(400).json({
            ok: false,
            err: {message: 'Wrong credentials provided'}
        });
    
    let token = jwt.sign({
        user: userFound
    }, process.env.SEED, { expiresIn: process.env.DEAD_TIME_TOKEN });

    res.json({
        ok: true,
        user: userFound,
        token
    });
});

module.exports = app
