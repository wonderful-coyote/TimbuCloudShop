//CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaHeart, FaStar, FaShoppingCart } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { useCart } from './CartContext';

const CartPage = () => {
  const navigate = useNavigate();
 
  const { cart, removeFromCart, updateQuantity, addToCart } = useCart();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    navigate('/checkout-page');
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleImageClick = (product) => {
    navigate('/product-page', { state: { product } });
  };

  const products = [
    { id: 1, src: "./timbu/1c806e1deb3638a0305ae3d8d7aeaa4a95b7efec.jpg", title: "Nike Airforce 1’ 07", price: 80, reviews: 100 },
    { id: 2, src: "./timbu/3d2d017cd58ce4025c7580580112012b97eb4aa8.jpg", title: "Nike Air Max 90", price: 85, reviews: 120 },
    { id: 3, src: "./timbu/e86e4ccedb1bca3b1ba8e1e3c7f0512ce535eaa4.jpg", title: "Air Jordan 13 R.", price: 95, reviews: 90 },
    { id: 4, src: "./timbu/d5234822891031f94bbc728926060de81e751d57.jpg", title: "Air Jordan Retro", price: 100, reviews: 110 },
    { id: 5, src: "./timbu/f7de98a0280bf85083fb2e3c87457ab9ad1e65a0.jpg", title: "Nike Free Metcon", price: 90, reviews: 95 },
    { id: 6, src: "./timbu/35fdb09b153eef1bc923ed13237b045a4fd6c136.jpg", title: "Nike Airforce 4", price: 85, reviews: 105 },
    { id: 7, src: "./timbu/25105d164850b1a45cf811ed1707809767ef97de.jpg", title: "Vans Airfield 3", price: 80, reviews: 100 },
    { id: 8, src: "./timbu/b53dee6fc09d923608c2e3b07a60845cf4fbea56.jpg", title: "Puma and Lamelo", price: 95, reviews: 90 },
    { id: 9, src: "./timbu/272e4d7b8e2dc59b4eca8d09363fc4027af9e813.jpg", title: "Nitro Elite 3", price: 100, reviews: 110 },
    { id: 10, src: "./timbu/6c2945c3bbe52ba7d0e8d80f17ed01c16e042abd.jpg", title: "Palermo leather", price: 90, reviews: 95 },
    { id: 11, src: "./timbu/13a92b07c0a40b09d6f1a86719368dec8a1e8ca8.jpg", title: "Team Big Kids", price: 85, reviews: 105 },
    { id: 12, src: "./timbu/de4bef426a1f8a8f0e306710e10e0192258ebd1e.jpg", title: "Amour Big Kids", price: 75, reviews: 98 },
    { id: 13, src: "./timbu/041af138c98bd2b9111298d581cbeb4e7a69b3a4.jpg", title: "Nano Court T.S", price: 110, reviews: 115 },
    { id: 14, src: "./timbu/59e602dad5a7dca654166b3a66154b60f7a6579c.jpg", title: "Panini Pres. 94", price: 120, reviews: 130 },
    { id: 15, src: "./timbu/1e0c41ff262be9b30fe552158754546fca8a8dee.jpg", title: "Nano X4", price: 95, reviews: 105 },
    { id: 16, src: "./timbu/55137142ae0bfd3f2660b4fa388ca709e0bf5f1c.jpg", title: "Club C Grounds", price: 85, reviews: 100 },
    { id: 17, src: "./timbu/baa2ce7c4d99969ebf8b0df7a974bac639a4a277.jpg", title: "Panini ES22", price: 130, reviews: 140 }
  ];

  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const selectedProducts = getRandomProducts(products, 3);

  return (
      <div>
        <Header />

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
                          <img src={item.src} alt={item.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
                          <div>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
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
                            onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                            className="bg-gray-200 px-2 py-1 rounded"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center">
                          <p className="text-gray-600">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </>
                )}
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
                    className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
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
            <h2 className="text-3xl font-bold text-center">We think you’ll like these</h2>
            <div className="mt-10 flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4">
              {selectedProducts.map((product) => (
                <div key={product.id} className="relative cursor-pointer flex-shrink-0 w-64 lg:w-auto" onClick={() => handleImageClick(product)}>
                  <img src={product.src} alt={product.title} className="w-full h-auto rounded-lg" />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <FaHeart className="text-gray-600" />
                  </button>
                  <div className="mt-2 flex justify-between">
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{product.title}</h3>
                      <div className="flex items-center text-xs space-x-2">
                        <p className="text-gray-600">${product.price}</p>
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                        <span className="text-gray-600">({product.reviews} reviews)</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaShoppingCart 
                        className="text-gray-600 text-2xl cursor-pointer" 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart({...product, quantity: 1});
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  };

export default CartPage;