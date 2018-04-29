import jwt from "jsonwebtoken";
import passport from "passport";
import { SECRET_KEY } from "../../../config";
import User from "../../models/user";

const registerUser = async ({ email, password }) => {
  const user = new User({ email, password });

  await user.save();

  return {
    data: user,
    status: true,
    messag: "User is registered"
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      status: false,
      message: "User with such email does not exist"
    };
  }

  const isMatch = user.isPasswordsEqual(password);

  if (!isMatch) {
    return {
      status: false,
      message: "Password is incorrect"
    };
  }

  var token = await jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

  return {
    status: true,
    token
  };
};

const getUser = async ({ id }, req) => {
  const user = await User.findById(id);

  if (!user) {
    return {
      status: false,
      message: "No user with such id"
    };
  }

  return {
    data: user,
    status: true
  };
};

export default {
  registerUser,
  loginUser,
  getUser
};
