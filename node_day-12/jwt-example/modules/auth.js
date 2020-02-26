const jwt = require('jsonwebtoken');

exports.generateJWT = async (user) =>
{
    const payload = { userId: user.id, email: user.email };
    const token = await jwt.sign(payload, process.env.SECRET);
    return token;
}

exports.validateJWT = async (req, res, next) =>
{
    let token = "" || req.headers['authorization'];

    if (token) {
        var payload = await jwt.verify(token, process.env.SECRET);
        req.user = payload;
        req.user.token = token;
        next();
    } else {
        res.status(400).json({ error: "token required" })
    }

}