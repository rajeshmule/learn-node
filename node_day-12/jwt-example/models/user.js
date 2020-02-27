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
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.pre('save', async function (next)
{
    try {
        if (this.password && this.isModified)
            this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.verifyPassword = async function (password)
{
    const verfyPass = await bcrypt.compare(password, this.password);
    return verfyPass;
}

const User = model('User', userSchema);
module.exports = User;