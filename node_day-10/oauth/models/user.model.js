const { Schema, model } = require('mongoose');
// const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }

}, { timestamps: true });



const Users = model('Users', userSchema);

module.exports = Users;