
const Ajv = require('ajv');
const express = require('express');
const { Post } = require('../../models/posts/post')
const Comment = require('../../models/posts/comments')
const { checkAuthentication } = require('../../middlewares/authentication')
const { verifyApiKey } = require('../../middlewares/api_key')
const ajv = new Ajv();
const app = express();


app.post('/comment', (req, res) => {
    var schema = {
        "properties": {
            "text": { "type": "string" },
            "post": { "type": "string" },
        },
        "oneOf": [
            { "required": ["text", "post"] },
        ],
    };
    const validate = ajv.compile(schema);
    let valid = validate(req.body);
    if (!valid) return res.status(400).json({ errors: validate.errors })

    Post.findOne({ _id: req.body.post }, (err, post) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!post) return res.status(404).json({
            ok: false, err: { message: "Related post not found" }
        })
        let comment = new Comment({
            text: req.body.text,
            post: req.body.post,
        });
        comment.save((err, db_comment) => {
            if (err) return res.status(500).json({ ok: false, err });
            return res.json({ ok: true });
        });
    });
})

app.get("/comment/:post", (req, res) => {
    if (!req.params.post.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            ok: false, err: { message: "Invalid post reference" }
        })
    }
    Post.findOne({ _id: req.params.post }, (err, post) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!post) return res.status(404).json({
            ok: false, err: { message: "Related post not found" }
        })
        Comment.find({ post: req.params.post }, (err, comments) => {
            if (err) return res.status(500).json({ ok: false, err });
            if (!comments) return res.json({ ok: true, comments: [] })
            return res.json({ ok: true, comments })
        })
    })
})

module.exports = app
