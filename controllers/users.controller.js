import { BCrypt, JWT } from 'jwt-auth-helper';
import User from '../models/User.model';

const jwt = new JWT(process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.json({ message: "User doesn't exist!" });

        const isPasswordCorrect = BCrypt.compareHash(password, existingUser.password);

        if (!isPasswordCorrect) return res.json({ message: "Intruder!!" });

        const token = jwt.generateJWTToken({ email: existingUser.email, id: existingUser._id }, '1h');

        res.status(200).json({ user: existingUser, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

exports.signup = async (req, res) => {
    const { name, username, phone, email, password, confirmPassword } = req.body;

    try {

        const existingUser = await User.findOne({ email });

        if (existingUser?.email) return res.json({ message: "User already exists! Please login now" });
        const hashedPassword = await BCrypt.makeHash(password, 12);

        const result = await User.create({ name, username, phone, email, password: hashedPassword });

        const token = jwt.generateJWTToken({ email: result.email, id: result._id }, '1h');

        res.status(200).json({ user: result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

exports.getUser = async (req, res) => {
    const { userId } = req;

    try {
        const existingUser = await User.findOne({ _id: userId });

        if (!existingUser) return res.json({ message: "User doesn't exist!" });

        res.status(200).json({ user: existingUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};