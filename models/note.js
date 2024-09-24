const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  title: String,
  content: {
    type: [String],
    required: true,
  },
  tags: [String],
})

module.exports = mongoose.model('Note', noteSchema)