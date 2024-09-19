const express = require('express')
const expressLayouts = require('express-ejs-layouts')

const app = express()
const PORT = 3000

app.use(expressLayouts)
app.use(express.static('public'))
app.set('layout', './layout')
app.set('view engine', 'ejs')

//=================
// General Routes
//=================
app.get('/', (req, res) => {
  res.render('_general/home', {title: 'Home'})
})

app.get('/about', (req, res) => {
  res.render('_general/about', {title: 'About'})
})

app.get('/contact', (req, res) => {
  res.render('_general/contact', {title: 'Contact'})
})

//=================
// Protected Routes
//=================



//=================
// Routers
//=================
const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(PORT)