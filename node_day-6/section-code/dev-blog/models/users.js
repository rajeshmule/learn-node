const { Schema, model } = require('mongoose');

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


const User = model('User', userSchema);
module.exports = User;