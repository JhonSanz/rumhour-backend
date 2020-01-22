const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ADMIN = 'ADMIN'
const USER = 'USER'


let roleChoices = {
    values: [ADMIN, USER],
    message: '{VALUE} is an invalid role.'
};


let userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: 'USER',
        enum: roleChoices
    },
});

/**
 * Defines displaying user schema fields
 */
userSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    delete userObject.role;
    return userObject;
}

module.exports = mongoose.model('User', userSchema);
