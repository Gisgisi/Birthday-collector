const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const Birthday = require('../models/Bday.model')
const { Logged } = require('../middleware/route.gaurd');

//const existingUser = User.findOne({ username: req.params.username })

/*Get the add new birthday page */
router.get('/profile/:username/new', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.params.username })
        res.render('user/new', { username: existingUser.username })
    } catch (error) { console.log(error) }
})


/*Post the form in new birthday page an redirect to profile to see the list */
router.post('/profile/:username/new', async (req, res) => {
    const { name, birthday, relationship, gender, note } = req.body
    try {
        await Birthday.create({
            name: name,
            birthday: birthday,
            relationship: relationship,
            gender: gender,
            note: note,
            user: req.session.User,
        })
        res.redirect('/profile/' + req.session.User.username)
    } catch (error) { console.log(error) }
})

/*Get the detail page */
router.get('/profile/:id/show', async (req, res) => {
    const { id } = req.params
    const currentBirthday = await Birthday.findById(id)
    res.render(`user/show`, { currentBirthday })
})


/*Get the edit birthday page */
router.get('/profile/:id/edit', async (req, res) => {
    const { id } = req.params
    const currentBirthday = await Birthday.findById(id)
    res.render('user/edit', { currentBirthday })
})

/*Post edit page */
router.post('/profile/:id/edit', async (req, res) => {
    const { id } = req.params
    const currentBirthday = await Birthday.findById(id)
   await  Birthday.findByIdAndUpdate(currentBirthday.id, req.body)
    res.redirect(`/profile/${req.params.id}/show`)
})

/* Get for deleting*/
router.get('/profile/:id/delete', async (req, res) => {
    const { id } = req.params
    const currentBirthday = await Birthday.findById(id)
    await Birthday.findByIdAndDelete(currentBirthday, req.params)
    res.redirect(`/profile/${req.session.User.username}`)})

module.exports = router;