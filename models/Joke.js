const mongoose = require('mongoose');

const {Schema} = mongoose;

const jokeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  joke: {
    type: String,
    required: true,
    maxLength: 255
  },
  date: {
    type: Date,
    required: true
  },
})

mongoose.model('joke', jokeSchema);