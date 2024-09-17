const validator = require("validator");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || "private_key", {
    expiresIn: process.env.JWT_EXPIRES || "1d"
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;

    // console.log(req.body);

    if (!firstName) {
      throw new AppError("firstName is invalid", 400);
    }
    if (!lastName) {
      throw new AppError("lastName is invalid", 400);
    }
    if (!email) {
      throw new AppError("email is required", 400);
    }
    if (!password) {
      throw new AppError("password is required", 400);
    }
    const isEmail = validator.isEmail(email + "");
    if (!isEmail) {
      throw new AppError("email address is invalid", 400);
    }

    const hashpassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email: isEmail && email,
      phone: phoneNumber || null,
      password: hashpassword
    });

    const token = genToken({ id: user.id });
    console.log(token);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (typeof email !== "string") {
      throw new AppError("email address or password is invalid", 400);
    }

    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      // throw new AppError('email address or password is invalid', 400);
      return res.status(200).json({ msg: "notRegister" });
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError("password is incorrect", 400);
    }

    const token = genToken({ id: user.id });
    return res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
