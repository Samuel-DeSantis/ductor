const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = 3000

// mongoose.connect(process.env.MONGODB_URL)
//   .then(() => {console.log(`CONNECTION::SUCCESSFUL`)})
//   .catch((err) => {console.log(`CONNECTION::ERROR::${err}`)})

app.use(expressLayouts)
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('layout', './layout')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('_general/home', {title: 'Home'})
})

app.get('/about', (req, res) => {
  res.render('_general/about', {title: 'About'})
})

app.get('/contact', (req, res) => {
  res.render('_general/contact', {title: 'Contact'})
})

const userRouter = require('./routes/users')
const noteRouter = require('./routes/notes')
app.use('/', userRouter)
app.use('/notes', noteRouter)

app.listen(PORT)