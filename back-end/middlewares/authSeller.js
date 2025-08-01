import jwt from "jsonwebtoken";
const authSeller = async (req, res, next) => {
    const {sellerToken} = req.cookies;
    if (!sellerToken) {
        return res.json({success: false, message: "You are not logged in"});
    }
    try {
            const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
            if (tokenDecode.email === process.env.SELLER_EMAIL) {
                next();
            } else {
                return res.json({success: false, message: "Not authorized"});
            }
        } catch (error) {
            console.log(error.message);
            res.json({success: false, message: "You are not logged in"});
        }
}
export default authSeller;