const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let products = [];
let cart = [];
let id = 0;

app.listen(3000, () => console.log('Server listening on port 3000!'));

//product back end
app.post('/api/products', (req, res) => {
  id = crypto.randomUUID();
  console.log(" post id: ", id);
  let product = {
    id: id,
    name: req.body.name,
    price: req.body.price
  };
  products.push(product);
  res.send(product);
});

app.get('/api/products', (req, res) => {
  console.log("products: ", products);
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
   let id = req.params.id;
   console.log("get id: ", id);
   let product = products.find(product => product.id == id);
   console.log("got: ", product);
   res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
  let id = req.params.id;
  products = products.filter(product => product.id != id);
  console.log("after delete: ", products);
  res.sendStatus(200);
});

//cart back end
app.post('/api/cart/:id', (req, res) => {
  let id = req.params.id;
  console.log("cart post id: ", id);
  const foundItem = cart.find(item => item.id == id);
  if (foundItem) {
    foundItem.quantity += 1;
    res.send(foundItem);
  }
  else {
    let item = {
      id: id,
      quantity: 1
    };
    cart.push(item);
    res.send(item);
  }
});

app.put('/api/cart/:id/:quantity', (req, res) => {
  let id = req.params.id;
  let quantity = parseInt(req.params.quantity);
  console.log("cart put id: ", id);
  const foundItem = cart.find(item => item.id == id);
  if (!foundItem) {
    res.sendStatus(404);
  }
  else if (quantity === 0) {
    cart = cart.filter(item => item.id != id);
  }
  else {
    foundItem.quantity = quantity;
  }
  res.send(foundItem);
});

app.get('/api/cart', (req, res) => {
  console.log("cart: ", cart);
  res.send(cart);
});


app.delete('/api/cart/:id', (req, res) => {
  let id = req.params.id;
  cart = cart.filter(item => item.id != id);
  console.log("after delete cart: ", cart);
  res.sendStatus(200);
});
