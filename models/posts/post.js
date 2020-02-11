
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PERSONAL = 'PERSONAL'
const PROFESSIONAL = 'PROFESSIONAL'

const allowedValues = [PERSONAL, PROFESSIONAL]

const typeChoices = {
    values: allowedValues,
    message: '{VALUE} is an invalid option.'
};

let postSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Post Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Post body is required'],
    },
    type: {
        type: String,
        default: PERSONAL,
        enum: typeChoices
    },
    user: { type: Schema.ObjectId, ref: "User" },
});

postSchema.path('type').validate((v) => {
    return v.length <= 750;
}, 'The maximum length has been exceeded.');

const Post = mongoose.model('Post', postSchema);
module.exports = {
    allowedValues, Post
}
