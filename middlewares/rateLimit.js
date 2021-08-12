import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: "Slow Down :)"
});

export const signupLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000,
  max: 5,
  message: ":)"
});

export const donationLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: "You can't ask for more donations today. Please come back tomorrow."
});

