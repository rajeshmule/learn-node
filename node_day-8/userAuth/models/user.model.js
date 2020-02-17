const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        unique: true
    }


}, { timestamps: true });

userSchema.pre('save', function (next)
{
    console.log("inside presave");
    var hashPassword = bcrypt.hashSync(this.password, 10);
    this.password = hashPassword;
    next();

});

userSchema.methods.verifyPassword = function (password)
{
    return bcrypt.compareSync(password, this.password);
};


const Users = model('Users', userSchema);
module.exports = Users;