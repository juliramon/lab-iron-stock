const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockSchema = new Schema({ symbol: String });

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;