const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render(`auth/login`)
});

router.get("/signup", (req, res) => {
  res.render(`auth/signup`)
});

router.get("/profile/:id", async(req, res) => {
  try {
  const existingUser = await User.findOne({ username: req.params.id })
  res.render(`auth/profile`, { existingUser })
  }catch(error){console.log(error)}
})

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.redirect("/profile")

  } catch (error) {
    if (error.code === 11000) {
      res.render("auth/signup", { errorMessage: "user already exists" })
    }
  }
})

router.post("/login", async (req, res) => {

  const { username, password } = req.body
  const existingUser = await User.findOne({ username })

  try {
    if (!existingUser) {
      res.render("auth/login", { errorMessage: "No user with this username" })
    }
    else {
      if (bcrypt.compareSync(password, existingUser.password)) {
        // req.session.User = currentUser
        res.redirect(`profile/${existingUser.username}`)

      } else {
        res.render('auth/login', { errorMessage: 'Password is incorrect' })
      }
    }
  }
  catch (error) {
    console.log(error)
  }
})

module.exports = router;
