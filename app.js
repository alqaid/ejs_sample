// app.js
const express = require('express');
const path = require('path')
const port = process.env.PORT || 3000
const app = express();

// VAriables de env
require('dotenv').config({ path: '.env' });


// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample MongoDB ------------------------------------------------------------------------

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://" + process.env.API_KEY + "@cluster0.tik81bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);



app.get('/movies', async (req, res) => {
    const _datos = await leerMongoDB();
    
    res.render('movies', {
        title: 'Base de datos de Películas',
        datos: _datos
    });
});


// Sample product data ------------------------------------------------------------------------
const products = [
    { id: 1, name: 'Laptop', price: 75000 },
    { id: 2, name: 'Mobile', price: 25000 },
    { id: 3, name: 'Tablet', price: 35000 }
];

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
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


async function leerMongoDB() {
  let devolver = "Bob";
  try {
    await client.connect();
    //const db = client.db('test');
    const db = client.db('sample_mflix');
    

    // Find the first document in the collection
    //const entry = db.collection('entries');
    //const first = await entry.findOne.la();
    //console.log(first);


    // Find the last document in the collection
    /*
    const entry = await db.collection('entries')
        .find()
        .sort({ _id: -1 })
        .limit(1)
        .toArray();

    if (entry.length === 0) {
    console.log('No entries found');
    } else {
    console.log('Last entry:', entry[0]);
    }
    */

    //f ultimas 24 horas

    const now = new Date();
    const yesterday = now - 24 * 60 * 60 * 1000;
    const lastYear = now - 100 * 360 * 24 * 60 * 60 * 1000;

    console.log('ALL');

    const entries = await db.collection('movies')
    .find()
    .sort({ released: -1 })
    .limit(100)
    .toArray();

    let matriz = [];

    if (entries.length === 0) {
        console.log('No entries found');
    }else{
        
     
        for (const entry of entries) {
            matriz.push({
              fecha: format_FechaCorta(entry.released),
              valor: entry.title
            }); 
           
        }
    } 

    devolver = matriz;
    console.log(entries.length);

  }catch (error) {  
    console.log("error");
    console.error(error.message); 
  }finally {
    // Close the database connection when finished or an error occurs
   
    await client.close();
  } 
  return devolver;
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


function format_HoraFecha(inputDate) {
    const date = new Date(inputDate);
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  }


function format_FechaCorta(inputDate) {
    const date = new Date(inputDate);
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }