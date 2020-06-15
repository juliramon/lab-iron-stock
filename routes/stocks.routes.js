const express = require('express');
const {
  loadStocks,
  loadAddStocksForm,
  submitNewStock
} = require('../controllers/stocks.controllers');

const router  = express.Router();

router
  .get('/stocks', loadStocks)
  .get('/add', loadAddStocksForm)
  .post('/add', submitNewStock)

module.exports = router;