const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Birthday = require('../models/Bday.model')
const { Logged } = require('../middleware/route.gaurd');

//const existingUser = User.findOne({ username: req.params.username })

/*Get the add new birthday page */
router.get('/profile/:username/addnew', async (req, res) => {
   try{
    const existingUser = await User.findOne({ username: req.params.username })
    res.render('user/new-bday', { username: existingUser.username })
   } catch(error){ console.log(error) }
})

/*Post the form in new birthday page */
router.post('/profile/:username/addnew', async (req, res) => {
    const { name, date, relationship, gender, note } = req.body
    try {
        await Birthday.create({
            name,
            date,
            relationship,
            gender,
            note,
        })
        res.redirect('/profile/:username/addnew')
    } catch (error) { console.log(error) }
})

/*Get the detail page */
router.get('/profile/:username/addnew', (req, res) => {
    res.render(`user/bday-detail`, { existingUser })
})


/*Post the form in new birthday page */


module.exports = router;