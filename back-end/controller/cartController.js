import User from "../models/User.js"; 
// Update user cartData : /api/user/update
export const updateCart = async (req, res) => {
    try {
        const {usesrId, cartItems} = req.body
        await User.findByIdAndUpdate(usesrId, {cartItems})
        res.json({success: true, message: "Cart updated successfully"})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: "Something went wrong"})
    }
}