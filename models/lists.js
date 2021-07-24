const mongoose = require('mongoose')
const listSchema = new mongoose.Schema({
  task: String,
  time: Number
})

const List = mongoose.model('List', listSchema)
module.exports = List
