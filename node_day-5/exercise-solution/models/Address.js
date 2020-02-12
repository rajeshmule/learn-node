const { Schema, model } = require('mongoose');

const User = require('./Users');

const addressSchema = new Schema({
    street: String,
    city: String,
    pin: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    }
}, { timestamps: true });

const Address = model('Address', addressSchema);
module.exports = Address;