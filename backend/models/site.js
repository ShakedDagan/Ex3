const mongoose = require('mongoose')

const siteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  town: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  data1: {
    type: String,
    required: true
  },
  data2: {
    type: String,
    required: true
  },
  img1:{
    type: String,
    required: true
  },
  img2:{
    type: String,
    required: true
  },
  img3:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Site', siteSchema)