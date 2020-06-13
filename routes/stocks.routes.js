const express = require('express');
const Stock = require('../models/stock');
const router  = express.Router();

router
  .get('/stocks', (req, res) => {
    Stock.find()
      .then(symbols => {
        console.log(`${symbols.length} symbols listed`)
        res.render('stockPanel', { symbols })
      })
  })
  .get('/add', (req, res) => res.render('addStock'))
  .post('/add', (req, res) => { 
    const { symbol } = req.body;
    Stock.create({symbol})
      .then(newSymbol => {
        console.log(`New asset added: ${newSymbol}`)
        res.redirect('/stocks')
      })
      .catch(err => console.log(`Error adding a new asset: ${err}`))
  })

module.exports = router;