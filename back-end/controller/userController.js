import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
// Register a new user: /api/users/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        const existingUser = await User.findOne({ email })
        if (existingUser)
            return res.json({ success: false, message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,    // Prevent JavaScript to access cookie
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time
        })
        return res.json({ success: true, user: { email: user.email, name: user.name }, message: "User registered successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: "Something went wrong" });
    }
}
// Login user: /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch)
            return res.json({success: false, message: "Invalid email or password"});
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        console.log(req.body);
        
        return res.json({ success: true, user: { email: user.email, name: user.name }, message: "User logged in successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: 'Something went wrong' });
    }
}
    // Check auth: /api/user/is-auth
    export const isAuth = async (req, res) => {
        try {
            const user = await User.findById(req.userId).select('-password');
            return res.json({success: true, user});
        } catch (error) {
            console.log(error.message);
            res.json({success: false, message: 'Something went wrong'});
        }
    }
//Logout user: /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success: true, message: "User logged out successfully"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: 'Something went wrong'});
    }
}