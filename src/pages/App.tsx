import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import About from '../pages/About';
import Register from '../components/Register/Register';
import UserProfile from '../pages/UserProfile';
import ProductsList from '../pages/ProductsPage'; 
import OrderHistory from './OrderHistory';

function App() {
  return (
    <Router>
      <Navbar title="" />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/produtos" element={<ProductsList />} /> {}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<OrderHistory />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
