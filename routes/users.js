const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

router.get('/signup', (req, res) => {
  res.render('users/signup')
})

router.post('/signup', async (req, res) => {
  const username = req.body.username
  try {
    const saltRounds = 10; // Adjust salt rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log(hash)
    const user = new User({
      username: username,
      password_digest: hash
    })
    user.save()
      .then(() => console.log("Succesfully Added Record"))
      .catch(err => console.log(err))
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
  console.log(req.body.password)

  res.render('users/show', {username: username})
})

router.get('/signin', (req, res) => {
  res.render('users/signin')
})

router.post('/signin', async (req, res) => {
  const username = req.body.username
  console.log(req.body.username)
  User.find({ username: req.body.username})
    .then(user => {
      bcrypt.compare(req.body.password, user[0].password_digest)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.error(err.message))
    })
  // const username = req.body.username

  res.render('users/show', {username: username})

  // res.render('users/show', {username: username})
})

// router.post('/', (req, res) => {
//   console.log(req.body)
//   res.redirect(`/users/show`)
// })

// router.get('/users', (req, res) => {
//   res.render('users/show')
// })

// router.post('/', async (req, res) => {
  // const note1 = new Note({
  //   title: 'Groceries',
  //   content: 'Apples, pears, beans',
  //   tags: ['shopping', 'budget']
  // })
  // try {
  //   const note1Save = await note1.save()
  //   res.status(200).json(note1Save)
  // } catch (err) {
  //   res.status(400).json({message: err.message})
  // }
// })

// const note1 = new Note({
//   title: 'Groceries',
//   content: 'Apples, pears, beans',
//   tags: ['shopping', 'budget']
// })
// note1.save()
//   .then(() => console.log('SUCCESSFULLY ADDED RECORD'))
//   .catch((err) => console.log(`ERROR::${err}`))

module.exports = router