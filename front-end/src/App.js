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

  // fetch ticket data
  useEffect(() => {
    fetchProducts();
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

  // render results
  return (
    <div className="App">
      <Error error ={error}/>
      <h1>Products</h1>
      {products.map( product => ( 
        <Product key={product.id} product={product} setError={setError} />
      ))}  
    </div>
  );
}

export default App;
