import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const model = {
  email: {
    type: String,
    lowercase: true,
    uniq: true
  },
  password: {
    type: String
  }
};

const User = new Schema(model);

User.pre("save", async function(next) {
  if (!this.isModified("password") && !this.isNew) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

User.methods.isPasswordsEqual = function (pw) {
  return bcrypt.compareSync(pw, this.password);
};

export default mongoose.model("User", User);