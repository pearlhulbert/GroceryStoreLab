import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Product from './Product.js';
import Error from './Error.js';

function App() {
  // setup state
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const fetchProducts = async() => {
    try {      
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch(error) {
      setError("error retrieving products: " + error);
    }
  }
  
  const fetchCart = async() => {
    try {      
      const response = await axios.get("/api/cart");
      setCart(response.data);
    } catch(error) {
      setError("error retrieving cart: " + error);
    }
  }
  
  
  const createProduct = async() => {
    try {
      await axios.post("/api/products", {name: name, price: price});
    } catch(error) {
      setError("error adding a ticket: " + error);
    }
  }
  const deleteOneProduct = async(product) => {
    try {
      await axios.delete("/api/products/" + product.id);
    } catch(error) {
      setError("error deleting a product" + error);
    }
  }
  
  const addProductToCart = async(id, name) => {
    try {
      await axios.post("/api/cart/" + id + "/" + name);
    } catch(error) {
      setError("error adding to cart" + error);
    }
  }
  
  const deleteFromCart = async(id) => {
    try {
      await axios.delete("/api/cart/" + id);
    } catch(error) {
      setError("error deleting from cart" + error);
    }
  }
  
  const updateItemQuantity = async(id, quantity) => {
    try {
      await axios.put("/api/cart/" + id + "/" + quantity);
    } catch(error) {
      setError("error updating quantity" + error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);

  const addProduct = async(e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setName("");
    setPrice("");
  }

  const deleteProduct = async(product) => {
    await deleteOneProduct(product);
    fetchProducts();
  }
  
  const addToCart = async(id, name) => {
    await addProductToCart(id, name);
    fetchCart();
  }
  
  const removeFromCart = async(id) => {
    await deleteFromCart(id);
    fetchCart();
  }
  
  const updateCart = async(id, quantity) => {
    await updateItemQuantity(id, quantity);
    fetchCart();
  }

  // render results
  return (
    <div className="App">
      <Error error ={error}/>
      <div class="products">
        <h1>Products</h1>
        {products.map( product => ( 
         <div>
          <p>{product.name}</p>
          <p><i> {product.price}</i></p>
          <button onClick={e => addToCart(product.id, product.name)}>Add to Cart</button>
        </div>
        ))}
      </div>
      <div class="cart">
        <h1>Cart</h1>
         {cart.map( item => ( 
         <div>
          <p>{item.name}, {item.quantity}</p>
          <button onClick={e => updateCart(item.id, item.quantity + 1)}>+</button>
          <button onClick={e => updateCart(item.id, item.quantity - 1)}>-</button>
          <button onClick={e => removeFromCart(item.id)}>Remove from Cart</button>
         </div>
        ))} 
      </div>
    </div>
  );
}

export default App;
