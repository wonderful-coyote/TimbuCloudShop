//productpage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaShoppingCart, FaTruck, FaThumbsUp } from 'react-icons/fa';
import Header from './Header';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';
import axios from 'axios';

const ScrollToTopOnMount = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { productId, discountApplied, discountPercentage } = location.state || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(null);
  const { cart, addToCart } = useCart()



  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }

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

        const productData = response.data.items.find(item => item.id === productId);

        if (productData) {
          setProduct(productData);
          if (discountApplied && discountPercentage) {
            const originalPrice = productData.current_price[0].USD[0];
            const discounted = originalPrice * (1 - discountPercentage / 100);
            setDiscountedPrice(discounted.toFixed(2));
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, discountApplied, discountPercentage]);

  // ... other functions remain the same
  const handleBackClick = () => {
    navigate(-1);
  };

  // In ProductPage.jsx

  const handleAddToCart = () => {
    if (selectedColor !== null && selectedSize !== null) {
      const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.selectedColor === selectedColor && 
        item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1 && cart[existingItemIndex].discounted) {
        // If the item already exists in the cart and is discounted,
        // add a new non-discounted item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.current_price[0].USD[0],
          src: `https://api.timbu.cloud/images/${product.photos[0]?.url}`,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
          quantity: 1,
          discounted: false
        };
        addToCart(newItem);
      } else {
        // If the item doesn't exist or is not discounted, add it with potential discount
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.current_price[0].USD[0],
          src: `https://api.timbu.cloud/images/${product.photos[0]?.url}`,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
          quantity: 1,
          discounted: discountedPrice !== null,
          discountedPrice: discountedPrice
        };
        addToCart(cartItem);
      }
      notifyItemAdded();
    } else {
      notifySelectColorSize();
    }
  };

  const notifyItemAdded = () => {
    toast.success('Item added to cart!', {
      autoClose: 2000,
    });
  };

  const notifySelectColorSize = () => {
    toast.error('Please select a color and size.', {
      autoClose: 2000,
    });
  };

  const reviews = [
    {
      user: 'Blade X',
      date: '2 days ago',
      review:
        'I recently purchased a pair of running shoes from this site, the sneakers are incredibly comfortable. The delivery was fast, and the customer service was outstanding. Highly recommend!',
    },
    {
      user: 'Blade X',
      date: '2 days ago',
      review: 'Love my new sneakers! They look exactly like the photos and fit perfectly.',
    },
    {
      user: 'Blade X',
      date: '2 days ago',
      review:
        'This is my go-to site for all my sneaker needs. The variety is fantastic, and the prices are unbeatable. I recently bought a pair of high-tops, and they are stylish and super comfy.',
    },
    {
      user: 'Blade X',
      date: '2 days ago',
      review: 'Love my new sneakers! They look exactly like the photos and fit perfectly.',
    },
  ];

return (
  <ScrollToTopOnMount>
    <div>
      <ToastContainer />
      <Header />

      <main className="p-5 max-w-7xl mx-auto">
        <button
          onClick={handleBackClick}
          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Back
        </button>

        {loading ? (
          <p>Loading product...</p>
        ) : error ? (
          <p>{error}</p>
        ) : product ? (
          <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frame 1: Product Image and Reviews */}
            <div className="col-span-1 md:col-span-1">
              {/* Main Product Image */}
              <div className="mb-8 relative">
                <img
                  src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
                  alt={product.name}
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Additional Images Container */}
              {showAllImages ? (
                <div className="grid grid-cols-4 gap-2">
                  {product.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={`https://api.timbu.cloud/images/${photo.url}`}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="w-full rounded-lg shadow-md"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex space-x-2" style={{ maxWidth: "100%" }}>
                  {product.photos.slice(0, 3).map((photo, index) => (
                    <img
                      key={index}
                      src={`https://api.timbu.cloud/images/${photo.url}`}
                      alt={`Product Thumbnail ${index + 1}`}
                      className="w-1/4 rounded-lg shadow-md"
                    />
                  ))}
                  {product.photos.length > 3 && (
                    <div
                      className="w-1/4 rounded-lg shadow-md bg-gray-200 flex items-center justify-center cursor-pointer"
                      onClick={() => setShowAllImages(true)}
                    >
                      <p className="text-center text-gray-600">
                        +{product.photos.length - 3} more
                      </p>
                    </div>
                  )}
                  {product.photos.length < 4 && Array(4 - product.photos.length).fill().map((_, index) => (
                    <img
                      key={`placeholder-${index}`}
                      src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
                      alt={`Product Thumbnail ${product.photos.length + index + 1}`}
                      className="w-1/4 rounded-lg shadow-md opacity-50"
                    />
                  ))}
                </div>
              )}

              {/* Customer Reviews */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                {reviews.map((review, index) => (
                  <div key={index} className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                    <div className="flex items-center mb-2">
                      <span className="text-gray-800 font-semibold">{review.user}</span>
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 mr-1" />
                        ))}
                      </div>
                      <span className="text-gray-500 ml-4">{review.date}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <p className="text-gray-700 flex-grow">{review.review}</p>
                      <div className="self-start">
                        <FaThumbsUp className="text-gray-500 ml-4 text-xl" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frame 2: Product Title, Price, and Reviews */}
            <div className="col-span-1 md:col-span-1 space-y-8">
              <div className="flex items-center">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">{product.name}</h2>
                </div>
              </div>

              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className={`text-yellow-400 ${index >= 4 ? 'text-gray-300' : ''}`} />
                ))}
                <span className="text-sm text-gray-500 ml-2">100 Reviews</span>
              </div>

              <div>
                {discountedPrice ? (
                  <>
                    <span className="text-xl font-semibold line-through text-gray-500">
                      ${product.current_price[0].USD[0]}
                    </span>
                    <span className="text-xl font-semibold ml-2 text-red-500">
                      ${discountedPrice}
                    </span>
                    <span className="text-sm text-red-500 ml-2">
                      50% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-semibold">
                    ${product.current_price[0].USD[0]}
                  </span>
                )}
                <span className="text-sm text-gray-500 ml-2">
                  {product.is_available ? "Available in Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Choose a Color */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Choose a Color</h2>
                <div className="flex flex-wrap gap-2">
                  {['red', 'blue', 'yellow', 'green'].map((color, index) => (
                    <div
                      key={index}
                      className={`w-12 h-12 rounded-lg shadow-md cursor-pointer border-2 transition-colors duration-200`}
                      style={{
                        borderColor: selectedColor === color ? color : 'transparent',
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      <img
                        src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
                        alt={`${product.name} in ${color}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-2">Sizes</h2>
                <div className="flex flex-wrap gap-2">
                  {[40, 41, 42, 43, 44, 45, 46, '46.5', 47, 48, 49, 50].map((size, index) => (
                    <button
                      key={index}
                      className={`bg-gray-200 text-gray-800 px-3 py-1 rounded-md shadow-md hover:bg-gray-300 transition-colors duration-200 ${selectedSize === size ? 'text-black' : ''}`}
                      style={{
                        backgroundColor: selectedSize === size ? selectedColor || 'gray' : '',
                        borderColor: selectedSize === size ? selectedColor || 'gray' : 'transparent',
                        borderWidth: '2px',
                        borderStyle: 'solid',
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart and Favorite Button */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center bg-black text-white border border-transparent px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-black hover:border-black transition duration-300"
                >
                  <FaShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full shadow-md hover:bg-gray-300">
                  <FaHeart className="text-gray-600" />
                </button>
              </div>

              {/* Free Delivery */}
              <div className="mb-8 flex items-center space-x-2">
                <FaTruck className="text-gray-600 text-2xl" />
                <p className="text-gray-600">Free delivery for orders over $100</p>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Product Description</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Frame 3: Product Features */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold mb-4">Product Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <ul className="list-disc list-inside">
                      <li className="text-gray-700">Feature 1</li>
                      <li className="text-gray-700">Feature 2</li>
                    </ul>
                  </div>
                  <div>
                    <ul className="list-disc list-inside">
                      <li className="text-gray-700">Feature 3</li>
                      <li className="text-gray-700">Feature 4</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No product data available</p>
        )}

        {/* Frame 5: Other Products */}
        {/* This section remains unchanged */}
      </main>

      
    </div>
  </ScrollToTopOnMount>
);
};

export default ProductPage;