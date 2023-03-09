import express from "express";
var router = express.Router();

// Route for user registration
router.post("/register", async (req, res) => {
  let reqBody = req.body;
  let newUser = await User({
    firstName: reqBody.firstName,
    lastName: reqBody.lastName,
    email: reqBody.email,
    mobileNo: reqBody.mobileNo,
    password: bcrypt.hashSync(reqBody.password, 10),
  });
  return res.send(true);
});

// Route for user authentication(login)
router.post("/login", (req, res) => {
  let reqBody = req.body;
  return res.send(
    User.findOne({ email: reqBody.email }).then((result) => {
      if (result == null) {
        return false;
      } else {
        const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);
        if (isPasswordCorrect) {
          return { access: auth.createAccessToken(result) };
        } else {
          return false;
        }
      }
    })
  );
});

export default router;
