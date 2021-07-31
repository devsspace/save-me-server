export const signupValidator = async (req, res, next) => {
    const { name, username, phone, email, password, confirmPassword } = req.body;
    // if (!name) return next(new Error('Name is required'));
    // if (!username) return next(new Error('username is required'));
    // if (!phone) return next(new Error('phone is required'));
    if (!email) return res.json({ message: "Email is required!"})
    if (!password) return res.json({ message: "Password is required!" });
    if (password !== confirmPassword) return res.json({ message: "Passwords don't match!" });
    next();
}