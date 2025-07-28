import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import About from "./About";
import Register from '../components/Register/Register';
import UserProfile from '../pages/UserProfile';
import ProductsList from '../pages/ProductsPage'; 
import OrderHistory from './OrderHistory';
import Welcome from '@/pages/Welcome';

function App() {
  return (
    <Router>
      <Navbar title="" />
      <div style={{ paddingTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="*" element={<h2>404 - Página não encontrada</h2>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
