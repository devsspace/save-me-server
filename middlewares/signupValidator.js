import validator from "validator";

export const signupValidator = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  if (!email) return res.json({ message: "Email is required!" });

  if (!validator.isEmail(email))
    return res.json({ message: "Do you tell that an email!?" });

  if (!password) return res.json({ message: "Password is required!" });

  if (!validator.isStrongPassword(password, { minLength: 6 }))
    return res.json({ message: "Do you tell that a password?" });

  if (password !== confirmPassword)
    return res.json({ message: "Passwords don't match!" });
    
  next();
};
