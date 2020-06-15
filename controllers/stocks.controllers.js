const Stock = require('../models/Stock.model');

const loadStocks = (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }
  Stock.find({user: req.session.currentUser._id})
    .then(symbols => {
      console.log(`${symbols.length} symbols listed`)
      res.render('stockPanel', { symbols })   
    })
};

const loadAddStocksForm = (req, res) => {
  if(!req.session.currentUser){
    res.redirect('/');
    return;
  }  else {
    res.render('addStock');
    return;
  }
};

const submitNewStock = (req, res) => { 
  if (!req.session.currentUser) {
    res.redirect('/');
    return;
  }
  const { symbol } = req.body;
  console.log(req.session.currentUser);
  Stock.create({
    symbol, 
    user: req.session.currentUser._id})
    .then(newSymbol => {
      console.log(`New asset added: ${newSymbol}`)
      res.redirect('/stocks')
    })
    .catch(err => console.log(`Error adding a new asset: ${err}`))
};


module.exports = {
  loadStocks,
  loadAddStocksForm,
  submitNewStock
}
