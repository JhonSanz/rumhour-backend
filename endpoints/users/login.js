
const express = require('express');
const app = express();
const user = require('../../models/users/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


app.post('/login', (req, res) => {

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
            usuario: userDB
        }, process.env.SEED, { expiresIn: process.env.DEAD_TIME_TOKEN });

        res.json({
            ok: true,
            usuario: userDB,
            token
        });
    });
});

module.exports = app
