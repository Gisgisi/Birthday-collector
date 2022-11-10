const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const { Logged, isLogin } = require('../middleware/route.gaurd');
const Birthday = require('../models/Bday.model');

/* GET login page */
router.get("/login", isLogin, (req, res) => {
    res.render(`auth/login`)
  });

/* GET sign up page */
router.get("/signup", isLogin, (req, res) => {
    res.render(`auth/signup`)
  });

/* GET profile page */
router.get("/profile/:username", Logged, async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.params.username } )
    const allBirthday = await Birthday.find({ user: req.session.User })
    res.render(`user/profile`, { username: existingUser.username, birthdayList: allBirthday })
  } catch (error) { console.log(error) }
});

/* Post data signup page */
router.post("/signup", isLogin, async (req, res) => {
  try {
    const { username, email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)

    await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.redirect("/login")

  } catch (error) {
    if (error.code === 11000) {
      res.render("auth/signup", { errorMessage: "user already exists" })
    }
  }
});

/* Post data login page */
router.post("/login", isLogin, async (req, res) => {

  const { username, password } = req.body
  const existingUser = await User.findOne({ username })

  try {
    if (!existingUser) {
      res.render("auth/login", { errorMessage: "No user with this username" })
    }
    else {
      if (bcrypt.compareSync(password, existingUser.password)) {

        req.session.User = existingUser
        res.redirect(`/profile/${existingUser.username}`)

      } else {
        res.render('auth/login', { errorMessage: 'Password is incorrect' })
      }
    }
  }
  catch (error) {
    console.log(error)
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy(err => {
      if (err) {
          next(err)
      }
      res.redirect('/login')
  })
})

module.exports = router;

