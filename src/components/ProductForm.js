// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductForm.css';

const useProduct = (id) => {
  const [product, setProduct] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(response => {
          setProduct({ title: response.data.title, description: response.data.body });
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching product');
          setLoading(false);
        });
    }
  }, [id]);

  return { product, setProduct, loading, error };
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, setProduct, loading, error } = useProduct(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = `https://jsonplaceholder.typicode.com/posts/${id ? id : ''}`;
    const apiMethod = id ? axios.put : axios.post;

    apiMethod(apiUrl, product)
      .then(() => navigate('/'))
      .catch(error => console.error(`Error ${id ? 'updating' : 'adding'} product:`, error));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{id ? 'Edit Product' : 'Add Product'}</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={product.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">{id ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
