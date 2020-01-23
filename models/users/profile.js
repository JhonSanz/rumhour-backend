const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Your Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Your lastname is required'],
    },
    profession: {
        type: String,
    },
    birth: {
        type: String
    },
    university: {
        type: String
    }
});

module.exports = mongoose.model('Profile', profileSchema);
