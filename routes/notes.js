const express = require('express')
const router = express.Router()

let notes = []

router.get('/', (req, res) => {
  console.log(notes)
  res.render('notes/index', {notes: notes})
})

router.get('/new', (req, res) => {
  res.render('notes/new')
})

router.post('/', (req, res) => {
  console.log(req.body.note)
  notes.push({note: req.body.note})
  console.log(notes)
  res.render('notes/show', {note: req.body.note})
})

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