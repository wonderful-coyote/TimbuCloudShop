// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductPage from './components/ProductPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import { CartProvider } from './components/CartContext'; // Import CartProvider
import './App.css';

function App() {
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/product-page" element={<ProductPage />} />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/checkout-page" element={<CheckoutPage />} />
          </Routes>
        </main>
      </Router>
    </CartProvider>
  );
}

export default App;