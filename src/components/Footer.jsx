import React from 'react';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-5 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4">Kicks</h2>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4">Shop</h2>
          <ul>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Women</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Men</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Kids</button>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4">Information</h2>
          <ul>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Delivery Information</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Privacy and Policy</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Terms of Service</button>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4">Company</h2>
          <ul>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">About Us</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Stores</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Refund Policy</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">Help and Advice</button>
            </li>
          </ul>
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <ul>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">kicks@gmail.com</button>
            </li>
            <li className="mb-2">
              <button className="text-white hover:underline focus:outline-none">+22776845638</button>
            </li>
            <li className="flex justify-center md:justify-start space-x-4 mt-2">
              <FaFacebook className="text-xl cursor-pointer hover:text-gray-400" />
              <FaTwitter className="text-xl cursor-pointer hover:text-gray-400" />
              <FaYoutube className="text-xl cursor-pointer hover:text-gray-400" />
              <FaInstagram className="text-xl cursor-pointer hover:text-gray-400" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
