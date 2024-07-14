import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaHeart, FaStar, FaEye, FaShoppingCart } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { useCart } from './CartContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, addToCart, clearCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://api.timbu.cloud/products", {
          params: {
            organization_id: "58ddfc3dae284682a34786c6a0ef8ca8",
            reverse_sort: false,
            size: 30,
            Appid: "XN6CWIWSNU9H02L",
            Apikey: "8e878218ff9b4c7dbbd6bc0b9c57f13c20240713162028067521",
          },
        });

        if (response.data && Array.isArray(response.data.items)) {
          const shuffled = [...response.data.items].sort(() => 0.5 - Math.random());
          setSelectedProducts(shuffled.slice(0, 3));
        } else {
          setError("Unexpected API response structure");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    navigate('/checkout-page');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = item.discounted ? item.discountedPrice : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const handleImageClick = (product) => {
    navigate('/product-page', { state: { product } });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared successfully!');
  };

  const handleViewProduct = (product) => {
    navigate('/product-page', { state: { productId: product.id } });
  };

  const getPrice = (product) => {
    if (product.current_price && Array.isArray(product.current_price) && product.current_price.length > 0) {
      const priceObj = product.current_price[0];
      const currency = Object.keys(priceObj)[0];
      if (Array.isArray(priceObj[currency]) && priceObj[currency].length > 0) {
        return priceObj[currency][0];
      }
    }
    return "N/A";
  };

  const handleQuantityChange = (index, newQuantity) => {
    const item = cart[index];
    if (item.discounted && newQuantity > item.quantity) {
      toast.error("Cannot increase quantity of discounted items.");
    } else {
      updateQuantity(index, newQuantity);
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />

      <main className="p-5">
        <button 
          onClick={handleBackClick} 
          className="bg-gray-200 p-2 rounded hover:bg-gray-300 mb-4"
        >
          Back
        </button>

        <div className="container mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

          <div className="lg:flex lg:space-x-8">
            {/* Left Column - Cart Contents */}
            <div className="w-full">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <>
                  <div className="hidden sm:grid sm:grid-cols-4 sm:gap-4 font-semibold mb-4">
                    <div className="col-span-2">Product</div>
                    <div>Quantity</div>
                    <div>Price</div>
                  </div>
                  {cart.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-start border-b py-4">
                      <div className="col-span-1 sm:col-span-2 flex items-start">
                        <img src={item.src} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-4" />
                        <div>
                          <h3 className="text-lg font-semibold">{item.name}</h3>
                          <p className="text-gray-600">Color: {item.selectedColor}</p>
                          <p className="text-gray-600">Size: {item.selectedSize}</p>
                          <button 
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-700 mt-2"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button 
                          onClick={() => handleQuantityChange(index, Math.max(1, item.quantity - 1))}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantityChange(index, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center">
                        {item.discounted ? (
                          <>
                            <p className="text-gray-600 line-through mr-2">${item.price}</p>
                            <p className="text-red-500">${item.discountedPrice}</p>
                          </>
                        ) : (
                          <p className="text-gray-600">${item.price}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
              <button 
                onClick={handleClearCart}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Clear Cart
              </button>
            </div>

            {/* Right Column - Order Summary and Payment Options */}
            <div className="lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping:</span>
                    <span>$10.00</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${(calculateTotal() + 10).toFixed(2)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full mt-4 bg-black text-white border border-transparent px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-black hover:border-black transition duration-300"
                  >
                    Proceed to Checkout
                  </button>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">We Accept</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Visa</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">MasterCard</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">American Express</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">PayPal</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Google Pay</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Apple Pay</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Venmo</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Discover</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Maestro</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Afterpay</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Debit cards</button>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded">Credit cards</button>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* Similar items section */}
        <section className="mt-10 bg-white p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center">We think you'll like these</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="mt-10 flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4">
              {selectedProducts.map((product) => (
                <div key={product.id} className="relative cursor-pointer flex-shrink-0 w-64 lg:w-auto" onClick={() => handleImageClick(product)}>
                  <img 
                    src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`} 
                    alt={product.name} 
                    className="w-full h-auto rounded-lg"
                  />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <FaHeart className="text-gray-600" />
                  </button>
                  <div className="mt-2 flex justify-between">
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{product.name}</h3>
                      <div className="flex items-center text-xs space-x-2">
                        <p className="text-gray-600">${getPrice(product)}</p>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                        <span className="text-gray-600">(100 reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaEye 
                        className="text-gray-600 text-2xl cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProduct(product);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;