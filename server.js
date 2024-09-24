const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const PORT = 3000


// const { MongoClient, ServerApiVersion } = require('mongodb');
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGODB_URL, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {console.log(`CONNECTION::SUCCESSFUL`)})
  .catch((err) => {console.log(`CONNECTION::ERROR::${err}`)})

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