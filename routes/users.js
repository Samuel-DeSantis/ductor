const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/', async (req, res) => {
  const uname = req.body.username
  try {
    const saltRounds = 10; // Adjust salt rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log(hash)
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
  console.log(req.body.password)
  res.render('users/show', {username: uname})
})

// router.get('/signup', (req, res) => {
//   res.render('users/signup')
// })

// router.post('/', (req, res) => {
//   console.log(req.body)
//   res.redirect(`/users/show`)
// })

// router.get('/users', (req, res) => {
//   res.render('users/show')
// })

module.exports = router