const jwt = require('jsonwebtoken');

exports.generateJWT = async (user) =>
{
    const payload = { userId: user.id, email: user.email };
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
}