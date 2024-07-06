import mongoose from "mongoose";
import dbconnect from "../../../lib/database/dbconnect";
import User from "../../../lib/model/User";
const signuphandler = async (req, res, next) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ){
        res.status(422).json({
            message:'Invalid input -password should also be at least 7 character long.'
        })
        return;
    }
      await dbconnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists!" });
    }

    const user = new User({ email, password });
    await user.save();
    res.status(201).json({ message: "User created!", userId: user._id });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default signuphandler;
