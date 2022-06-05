const jwt = require("jsonwebtoken");


function authUser(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.send("Access Denied");
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;

        next();
    } catch (error) {
        res.send("Invalid Token");
    }
}

function authRole(role) {

    return (req, res, next) => {
        console.log(req.user.role);
        if (req.user.role !== "ADMIN") {
            if (req.user.role !== role) {
                return res.send("Access Denied");
            }
        }

        next();
    };
}

module.exports = {
    authUser,
    authRole
}
