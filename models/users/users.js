const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ADMIN = 'ADMIN'
const USER = 'USER'

let roleChoices = {
    values: [ADMIN, USER],
    message: '{VALUE} is an invalid role.'
};

const validateEmail = (email) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: [validateEmail, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    secretKey: {
        type: String
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

userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

module.exports = mongoose.model('User', userSchema);
