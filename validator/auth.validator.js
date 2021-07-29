exports.signupValidator = async (req, res, next) => {
    const { name, username, phone, email, password, confirmPassword } = req.body;
    if (!name) return next(new Error('Name is required'));
    if (!username) return next(new Error('username is required'));
    if (!phone) return next(new Error('phone is required'));
    if (!email) return next(new Error('email is required'));
    if (!password) return next(new Error('password is required'));
    if (password !== confirmPassword) return next(new Error('password doesn\'t match'));
    next();
}