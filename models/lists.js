const mongoose = require('mongoose')
const listSchema = new mongoose.Schema({
  task: String,
  time: String
})

const List = mongoose.model('List', listSchema)
module.exports = List
