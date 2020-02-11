
const Ajv = require('ajv');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = require('../../models/users/users');
const ajv = new Ajv();
const app = express();

dotenv.config();


app.post('/login', (req, res) => {
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

    user.findOne({ email: req.body.email }, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });

        if (!userDB || !bcrypt.compareSync(req.body.password, userDB.password))
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Wrong credentials provided'
                }
            });

        let token = jwt.sign({
            user: userDB
        }, process.env.SEED, { expiresIn: process.env.DEAD_TIME_TOKEN });

        res.json({
            ok: true,
            user: userDB,
            token
        });
    });
});

module.exports = app
