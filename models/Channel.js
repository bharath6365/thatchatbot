const mongoose = require('mongoose');

const {Schema} = mongoose;

const channelSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  recommendations: {
    type: Array,
    required: true
  },
})

mongoose.model('channel', channelSchema);