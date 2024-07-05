// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductList.css';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching products');
        setLoading(false);
      });
  }, []);

  return { products, loading, error };
};

const ProductList = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="product-list">
      <h2>Product List</h2>
      <Link to="/add" className="add-product-link">Add Product</Link>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
