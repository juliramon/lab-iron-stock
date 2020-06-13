document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

const symbols = document.querySelectorAll('canvas');
symbols.forEach(canvas => {
  const apikey = 'LB9Y5TE3UJ6XFBYN';
  const functionName = 'TIME_SERIES_DAILY';
  const symbol = canvas.id;
  const apiUrl = `https://www.alphavantage.co/query?function=${functionName}&symbol=${symbol}&apikey=${apikey}`;

  axios
    .get(apiUrl)
    .then(APIresponse => {
      printChart(APIresponse.data, symbol)
    })
    .catch(err => console.log('Error getting the data', err));
})

function printChart(stockData, symbol) {
  console.log(stockData);
  const dailyData = stockData['Time Series (Daily)'];
  const stockDates = Object.keys(dailyData);
  const stockPrices = stockDates.map(date => dailyData[date]['4. close']);

  const ctx = document.getElementById(symbol).getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: stockDates,
      datasets: [
        {
          label: `${symbol} Chart`,
          backgroundColor: 'rgb(255,99,132)',
          borderColor: 'rgb(255,99,132)',
          data: stockPrices
        }
      ]
    }
  })
};