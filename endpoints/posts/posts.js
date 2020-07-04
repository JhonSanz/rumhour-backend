/**
* @file Posts endpoints definition
*/

const Ajv = require('ajv');
const express = require('express');
const { allowedValues, Post } = require('../../models/posts/post')
const { checkAuthentication } = require('../../middlewares/authentication')
const { verifyApiKey } = require('../../middlewares/api_key')
const ajv = new Ajv();
const app = express();

/**
* Creates new post.
* @return {JSON} Created post or error.
*/
app.post('/post', async (req, res) => {
    var schema = {
        "properties": {
            "title": { "type": "string" },
            "body": { "type": "string" },
            "type": { "enum": allowedValues }
        },
        "oneOf": [
            { "required": ["title", "body", "type"] },
        ],
    };
    const validate = ajv.compile(schema);
    let valid = validate(req.body);
    if (!valid) return res.status(400).json({ errors: validate.errors })

    let post = new Post({
        title: req.body.title,
        body: req.body.body,
        type: req.body.type,
        user: req.user
    });

    post = await post.save()
        .catch(err => res.status(400).json({
            ok: false,
            err
        }))

    return res.json({
        ok: true,
        post: post
    })
})

module.exports = app
