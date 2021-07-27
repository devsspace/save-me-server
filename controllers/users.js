import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        
        if(!existingUser) return res.json({ message: "User doesn't exist!" });
        
        const isPasswordCorrect = bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.json({ message: "Intruder!!" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWTSECRET, 
            // { expiresIn: '1h'}
            );

        res.status(200).json({ user: existingUser, token});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

export const signup = async (req, res) => {
    const {userName, email, password, confirmPassword} = req.body;
    
    try {
        
        const existingUser = await User.findOne({ email });
        
        if (existingUser?.email) return res.json({ message: "User already exists!" });
    
        if(password !== confirmPassword) return res.json({ message: "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ userName, email, password: hashedPassword });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWTSECRET, { expiresIn: '1h'});

        res.status(200).json({ user: result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
}

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