import express from "express";
import bcrypt from "bcrypt"
import User from "../models/User.js"
import { createAccessToken } from "../auth.js";
var router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  let reqBody = req.body;
  console.log(User)
  let newUser = await User.create({
    email: reqBody.email,
    isAdmin : false , 
    password: await bcrypt.hashSync(reqBody.password, 10),
    mobileNo : reqBody.mobile 
  });

  return res.send(true);
});

// Route for user authentication(login)
router.post("/login", async (req, res) => {
  let reqBody = req.body;
  const result = await User.findOne({ email: reqBody.email })
  console.log( result )
    const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
    console.log( isPasswordCorrect )
    if (isPasswordCorrect) {
  return res.send({ access: createAccessToken(result) })
    } else {
      return res.send(false)
    }
      
});



export default router;
