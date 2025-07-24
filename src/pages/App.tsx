import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import About from '../pages/About';
import Register from '../components/Register/Register';
import ProductsList from '../pages/ProductsPage'; // importando a página com fetch real

function App() {
  return (
    <Router>
      <Navbar title="" />
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/produtos" element={<ProductsList />} /> {/* rota alternativa para produtos */}
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
