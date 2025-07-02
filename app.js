// app.js
const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000
const app = express();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample product data
const products = [
    { id: 1, name: 'Laptop', price: 75000 },
    { id: 2, name: 'Mobile', price: 25000 },
    { id: 3, name: 'Tablet', price: 35000 }
];

// Route to render the products page
app.get('/products', (req, res) => {
    res.render('products', {
        title: 'Web Angel Alcaide',
        products: products
    });
});

// Route to render the products page
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Web Angel Alcaide',
        messages: 'Clic en el link'
    });
});

const server = app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: gracefully shutting down')
  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }
})

// Start the Express app
/*app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});*/
