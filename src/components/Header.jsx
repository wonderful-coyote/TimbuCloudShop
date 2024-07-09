//Header.jsx
import React, { useState } from 'react';
import { FaHeart, FaShoppingCart, FaUser, FaBars, FaSearch, FaCaretDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleCartClick = () => {
    navigate('/cart-page');
  };

  return (
    <header className="p-5 bg-white shadow-md flex justify-between items-center relative z-50">
      <button
        className="text-2xl font-righteous lg:mr-6"
        onClick={handleLogoClick}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Kicks
      </button>
      <div className="flex items-center space-x-4 lg:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-10 border border-gray-300 rounded-full bg-offwhite"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-600" />
        </div>
        <button onClick={toggleMenu}>
          <FaBars className="text-gray-600" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-0 w-48 bg-white shadow-md rounded-lg p-2 z-50">
            <nav className="flex flex-col space-y-2">
              <a href="#collections" className="text-gray-600 hover:text-black flex items-center">
                Collections <FaCaretDown className="ml-1" />
              </a>
              <a href="#sales" className="text-gray-600 hover:text-black">Sales</a>
              <a href="#delivery" className="text-gray-600 hover:text-black">Delivery</a>
              <a href="#whyus" className="text-gray-600 hover:text-black">Why us</a>
              <a href="#favorites" className="text-gray-600 hover:text-black flex items-center">
                <FaHeart className="mr-1" /> Favourites
              </a>
              <button onClick={handleCartClick} className="text-gray-600 hover:text-black flex items-center" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <FaShoppingCart className="mr-1" /> Cart
              </button>
              <a href="#account" className="text-gray-600 hover:text-black flex items-center">
                <FaUser className="mr-1" /> Account
              </a>
            </nav>
          </div>
        )}
      </div>
      <nav className="hidden lg:flex flex-1 justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="#collections" className="text-gray-600 hover:text-black flex items-center">
            Collections <FaCaretDown className="ml-1" />
          </a>
          <a href="#sales" className="text-gray-600 hover:text-black">Sales</a>
          <a href="#delivery" className="text-gray-600 hover:text-black">Delivery</a>
          <a href="#whyus" className="text-gray-600 hover:text-black">Why us</a>
        </div>
        <div className="flex items-center space-x-4 lg:ml-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="p-2 pl-10 border border-gray-300 rounded-full bg-offwhite"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-600" />
          </div>
          <a href="#favorites" className="text-gray-600 hover:text-black flex items-center">
            <FaHeart className="mr-1" /> Favourites
          </a>
          <button onClick={handleCartClick} className="text-gray-600 hover:text-black flex items-center" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <FaShoppingCart className="mr-1" /> Cart
          </button>
          <a href="#account" className="text-gray-600 hover:text-black flex items-center">
            <FaUser className="mr-1" /> Account
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
