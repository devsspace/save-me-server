import { BCrypt, JWT } from "jwt-auth-helper";
import User from "../models/User.model.js";

const jwt = new JWT(process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY");

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.json({ message: "User doesn't exist!" });

        const isPasswordCorrect = await BCrypt.compareHash(password, existingUser.password);
        
        if (!isPasswordCorrect) return res.json({ message: "Intruder!!" });

        const token = jwt.generateJWTToken(
            { email: existingUser.email, id: existingUser._id, role: existingUser.role },
            "1h"
        );

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const signup = async (req, res) => {
    const { email, password, confirmPassword, lastDonationDate } = req.body;

    try {
        const donationBefore = new Date().getTime() - Date.parse(lastDonationDate);
        const fourMonth = 4 * 30 * 24 * 60 * 60 * 1000;
        const eligibility = donationBefore >= fourMonth ? "eligible" : "not eligible";

        const existingUser = await User.findOne({ email });

        if (existingUser?.email)
            return res.json({ message: "User already exists! Please login now" });
        const hashedPassword = await BCrypt.makeHash(password, 12);

        const result = await User.create({
            email,
            password: hashedPassword,
            role: "donor",
            eligibility,
        });

        const token = jwt.generateJWTToken(
            { email: result.email, id: result._id, role: result.role },
            "1h"
        );

        res.status(200).json({ user: result, token });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message || "Something went wrong!" });
    }
};

export const getUser = async (req, res) => {
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

export const updateProfile = async (req, res) => {
    const profileInfo = req.body;
    const { userId } = req;

    try {
        const existingUser = await User.findOne({ _id: profileInfo._id, email: profileInfo.email });

        if (!existingUser) return res.json({ message: "No user found for this profile!" });

        if (existingUser._id != userId) return res.json({ message: "Unauthorized!" });

        const result = await User.updateOne({ _id: userId }, profileInfo);

        if (result.nModified > 0) return res.status(200).json({ user: profileInfo });

        res.json({ message: "Nothing's changed!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
