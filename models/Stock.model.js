const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({ 
  symbol: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;