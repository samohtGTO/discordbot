const mongoose = require('mongoose')

const coinsSchema = mongoose.Schema({
  // The user ID
  _id: {
    type: String,
    required: true,
  },

  // How many messages they have sent
  coins: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('coins', coinsSchema)