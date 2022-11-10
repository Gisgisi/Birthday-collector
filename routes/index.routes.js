const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const { Logged, isLogin } = require('../middleware/route.gaurd');

/* GET home page */
router.get("/", isLogin, (req, res) => {
  res.render("index");
});

module.exports = router;
