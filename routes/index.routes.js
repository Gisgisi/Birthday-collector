const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')

/* GET home page */
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
