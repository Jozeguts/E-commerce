// src/components/ProductDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p>{product.body}</p>
      <Link to={`/edit/${product.id}`} className="edit-link">Edit</Link>
      <Link to="/" className="back-link">Back to Product List</Link>
    </div>
  );
};

export default ProductDetail;
