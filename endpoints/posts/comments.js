/**
* @file Comments endpoints definition
*/

const Ajv = require('ajv');
const express = require('express');
const { Post } = require('../../models/posts/post')
const Comment = require('../../models/posts/comments')
const { checkAuthentication } = require('../../middlewares/authentication')
const { verifyApiKey } = require('../../middlewares/api_key')
const ajv = new Ajv();
const app = express();

/**
* Creates new comment.
* @return {JSON} Created post or error.
*/
app.post('/comment', async (req, res) => {
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

    post = await Post.findOne({ _id: req.body.post })
        .catch(err => res.status(500).json({ ok: false, err }))

    if (!post) return res.status(404).json({ ok: false, err: { message: "Related post not found" } })

    let comment = new Comment({
        text: req.body.text,
        post: req.body.post,
    });
    await comment.save()
        .catch(err => res.status(500).json({ ok: false, err }))

    return res.json({ ok: true });
})

/**
* Retrieves post comments.
* @return {JSON} Post comments.
*/
app.get("/comment/:post", async (req, res) => {
    if (!req.params.post.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            ok: false, err: { message: "Invalid post reference" }
        })
    }
    post = await Post.findOne({ _id: req.params.post })
        .catch(err => res.status(500).json({ ok: false, err }))

    if (!post) return res.status(404).json({ ok: false, err: { message: "Related post not found" } })

    comments = await Comment.find({ post: req.params.post })
        .catch(err => res.status(500).json({ ok: false, err }))

    if (!comments) return res.json({ ok: true, comments: [] })

    return res.json({ ok: true, comments })
})

module.exports = app
