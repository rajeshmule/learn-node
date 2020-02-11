const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, "can't be blank"],
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    age: {
        type: Number,
        default: 18
    }
}, { timestamps: true });

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

const User = model('User', userSchema);
module.exports = User;