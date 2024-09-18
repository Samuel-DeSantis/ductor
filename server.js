const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('_general/home')
})

app.get('/about', (req, res) => {
  res.render('_general/about')
})

app.get('/contact', (req, res) => {
  res.render('_general/contact')
})

const userRouter = require('./routes/users')
app.use('/users', userRouter)

app.listen(3000)