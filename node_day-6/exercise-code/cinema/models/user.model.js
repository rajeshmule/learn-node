const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "is invalid"]
    }
}, { timestamps: true });

const Users = model('Users', userSchema);

module.exports = Users;