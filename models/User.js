const mongoose = require('mongoose');

const {Schema} = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  contacted: {
    type: Boolean,
    default: false
  }
})

mongoose.model('user', userSchema);