import './App.css';
import ProductDetail from './components/ProductDetail';
import ProductList from './components/ProductList'; 
import ProductForm from './components/ProductForm';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from'react-router-dom';

function App() {
  return (
    <Router>
      <div className='app'>
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/products/:id' element={<ProductDetail />} />
              <Route path='/add' element={<ProductForm />} />
              <Route path='/edit/:id' element={<ProductForm />} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
