const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const { Logged } = require('../middleware/route.gaurd');

/* GET login page */
router.get("/login", (req, res) => {
    res.render(`auth/login`)
  });

/* GET sign up page */
router.get("/signup", (req, res) => {
    res.render(`auth/signup`)
  });
  
  /* GET profile page */
  router.get("/profile/:username", Logged, async (req, res) => {
    try {
      const existingUser = await User.findOne({username:req.params.username} )
      res.render(`user/profile`, { existingUser })
    } catch (error) { console.log(error) }
  })
  
  User.find
  /* Post data signup page */
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
  
      res.redirect("/login")
  
    } catch (error) {
      if (error.code === 11000) {
        res.render("auth/signup", { errorMessage: "user already exists" })
      }
    }
  })
  
  
  /* Post data login page */
  router.post("/login", async (req, res) => {
  
    const { username, password } = req.body
    const existingUser = await User.findOne({ username })
  
    try {
      if (!existingUser) {
        res.render("auth/login", { errorMessage: "No user with this username" })
      }
      else {
        if (bcrypt.compareSync(password, existingUser.password)) {
           
          console.log('SESSION =====> ', req.session);
          req.session.User = existingUser
          console.log('SESSION =====> after', req.session)
          res.redirect(`/profile/${existingUser.username}`)
  
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
  
