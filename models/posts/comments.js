const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CommentSchema = Schema({
    text: String,
    likes: Number,
    dislikes: Number,
    post: { type: Schema.ObjectId, ref: "Post" },
});

module.exports = mongoose.model("Comment", CommentSchema);
