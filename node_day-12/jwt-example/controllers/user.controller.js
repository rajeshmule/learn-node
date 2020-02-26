const User = require('../models/user.model');
// const jwt = require('jsonwebtoken');
const auth = require('../modules/auth');

exports.signup = async (req, res, next) =>
{
    try {
        const data = req.body;
        const user = await User.create(data);
        const token = await auth.generateJWT(user);
        console.log(token);
        res.json({ user, token });
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) =>
{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "Please enter a valid email" });
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) return res.status(400).json({ error: "Invalid Password" });
        const token = await auth.generateJWT(user);
        res.json({
            user, token
        });
    } catch (err) {
        next(err);
    }
}