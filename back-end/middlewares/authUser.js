import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json({success: false, message: "You are not logged in"});
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        } else {
            return res.json({success: false, message: "Not authorized"});
        }
        next();
    } catch (error) {
        console.log(req.body);
        
        console.log(error.message);
        res.json({success: false, message: "You are not logged in"});
    }
}
export default authUser