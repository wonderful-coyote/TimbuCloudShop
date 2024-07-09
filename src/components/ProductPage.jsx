//ProductPage.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaStar, FaShoppingCart, FaTruck, FaThumbsUp } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from './CartContext';

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state || {};

  const { addToCart } = useCart();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  // Handle case where product is not available in state
  if (!product) {
    // Redirect to home page or show a fallback UI
    navigate('/');
    return null; // Return null to prevent rendering the rest of the component
  }

  const handleBackClick = () => {
    navigate(-1); // This will take the user to the previous page
  };

  const handleAddToCart = () => {
    if (selectedColor !== null && selectedSize !== null) {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        src: product.src,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
        quantity: 1, 
      };
      addToCart(cartItem);
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

  const productDescription = `
    These Nike G.T. Hustle 3 Blueprint shoes give the classic Samba silhouette a stylish, elevated update. The premium leather upper features embroidered 3-Stripes for a fresh edge while metallic accents add a touch of shine. The thick rubber outsole stands on its own but references the iconic look of the original style. Whether you pair them with jeans, tights or a maxi dress, they're perfect for adding a retro-cool vibe to any outfit.
    As recreational running established widespread popularity in the 1970s, the benchmark for running footwear shifted from mere existence to performance. While the era’s designs would be considered simple by today’s standards, the decade stands out as the moment when running shoes truly came into their own. The New Balance 327 sheds new light on the ‘70s as a time of innovation by boldly reshaping classic design elements with a thoroughly contemporary outlook. With an angular reworking of the tried-and-true wedge silhouette, outsize, asymmetrically applied ‘N’ branding, and wraparound, trail-inspired lug outsole, the New Balance 327 provides nothing less than a complete reimagination of our running heritage.
  `;

  const productDetails = `
    Regular fit
    Lace closure
    Leather upper
    Textile and synthetic lining
    Rubber outside
    Imported
    Product color: Off white / Halo blue / Rose gold
    Textile and synthetic lining
  `;

  const detailsArray = productDetails.trim().split('\n');
  const halfLength = Math.ceil(detailsArray.length / 2);
  const detailsColumn1 = detailsArray.slice(0, halfLength);
  const detailsColumn2 = detailsArray.slice(halfLength);

  const products = [
    { id: 1, src: "src/timbu/1c806e1deb3638a0305ae3d8d7aeaa4a95b7efec.jpg", title: "Nike Airforce 1’ 07", price: 80, reviews: 100 },
    { id: 2, src: "src/timbu/3d2d017cd58ce4025c7580580112012b97eb4aa8.jpg", title: "Nike Air Max 90", price: 85, reviews: 120 },
    { id: 3, src: "src/timbu/e86e4ccedb1bca3b1ba8e1e3c7f0512ce535eaa4.jpg", title: "Air Jordan 13 R.", price: 95, reviews: 90 },
    { id: 4, src: "src/timbu/d5234822891031f94bbc728926060de81e751d57.jpg", title: "Air Jordan Retro", price: 100, reviews: 110 },
    { id: 5, src: "src/timbu/f7de98a0280bf85083fb2e3c87457ab9ad1e65a0.jpg", title: "Nike Free Metcon", price: 90, reviews: 95 },
    { id: 6, src: "src/timbu/35fdb09b153eef1bc923ed13237b045a4fd6c136.jpg", title: "Nike Airforce 4", price: 85, reviews: 105 },
    { id: 7, src: "src/timbu/25105d164850b1a45cf811ed1707809767ef97de.jpg", title: "Vans Airfield 3", price: 80, reviews: 100 },
    { id: 8, src: "src/timbu/b53dee6fc09d923608c2e3b07a60845cf4fbea56.jpg", title: "Puma and Lamelo", price: 95, reviews: 90 },
    { id: 9, src: "src/timbu/272e4d7b8e2dc59b4eca8d09363fc4027af9e813.jpg", title: "Nitro Elite 3", price: 100, reviews: 110 },
    { id: 10, src: "src/timbu/6c2945c3bbe52ba7d0e8d80f17ed01c16e042abd.jpg", title: "Palermo leather", price: 90, reviews: 95 },
    { id: 11, src: "src/timbu/13a92b07c0a40b09d6f1a86719368dec8a1e8ca8.jpg", title: "Team Big Kids", price: 85, reviews: 105 },
    { id: 12, src: "src/timbu/de4bef426a1f8a8f0e306710e10e0192258ebd1e.jpg", title: "Amour Big Kids", price: 75, reviews: 98 },
    { id: 13, src: "src/timbu/041af138c98bd2b9111298d581cbeb4e7a69b3a4.jpg", title: "Nano Court T.S", price: 110, reviews: 115 },
    { id: 14, src: "src/timbu/59e602dad5a7dca654166b3a66154b60f7a6579c.jpg", title: "Panini Pres. 94", price: 120, reviews: 130 },
    { id: 15, src: "src/timbu/1e0c41ff262be9b30fe552158754546fca8a8dee.jpg", title: "Nano X4", price: 95, reviews: 105 },
    { id: 16, src: "src/timbu/55137142ae0bfd3f2660b4fa388ca709e0bf5f1c.jpg", title: "Club C Grounds", price: 85, reviews: 100 },
    { id: 17, src: "src/timbu/baa2ce7c4d99969ebf8b0df7a974bac639a4a277.jpg", title: "Panini ES22", price: 130, reviews: 140 }
  ];

  const getRandomProducts = (products, count) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const selectedProducts = getRandomProducts(products, 3);

  const handleImageClick = (product) => {
    navigate('/product-page', { state: { product } });
  };

  

  return (
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
        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Frame 1: Product Image and Reviews */}
          <div className="col-span-1 md:col-span-1">
            {/* Main Product Image */}
            <div className="mb-8 relative">
              <img src={product.src} alt={product.title} className="w-full rounded-lg shadow-md" />
            </div>

            {/* Additional Images Container */}
            <div className="flex space-x-2" style={{ maxWidth: "100%" }}>
              {[1, 2, 3].map((index) => (
                <img key={index} src={product.src} alt={`Product Thumbnail ${index}`} className="w-1/3 rounded-lg shadow-md" />
              ))}
            </div>

            {/* Customer Reviews */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {reviews.map((review, index) => (
                <div key={index} className="mb-4 p-4 rounded-lg shadow-md bg-gray-100">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-800 font-semibold">{review.user}</span>
                  </div>

                  <div className="flex items-center mb-2">
                    {/* Star Ratings */}
                    <div className="flex items-center">
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
                      <FaStar className="text-yellow-500 mr-1" />
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
                <h2 className="text-2xl font-semibold">{product.title}</h2>
              </div>

            </div>

            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={`text-yellow-400 ${index >= 4 ? 'text-gray-300' : ''}`} />
              ))}
              <span className="text-sm text-gray-500 ml-2">{product.reviews} Reviews</span>
            </div>

            <div>
              <span className="text-xl font-semibold">${product.price}</span>
              <span className="text-sm text-gray-500 ml-2">Available in Stock</span>
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
                      src={product.src}
                      alt={`${product.title} in ${color}`}
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
                    className={`bg-gray-200 text-gray-800 px-3 py-1 rounded-md shadow-md hover:bg-gray-300 transition-colors duration-200 ${
                      selectedSize === size ? 'text-black' : ''
                    }`}
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
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
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
              <p className="text-gray-700">{productDescription}</p>
            </div>

            {/* Frame 3: Product Features */}
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Product Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="list-disc list-inside">
                    {detailsColumn1.map((detail, index) => (
                      <li key={index} className="text-gray-700">{detail}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <ul className="list-disc list-inside">
                    {detailsColumn2.map((detail, index) => (
                      <li key={index} className="text-gray-700">{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>


        </div>



        {/* Frame 5: Other Products */}
        <section className="mt-10 bg-white p-5 sm:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Similar items you might like</h2>
          <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-3 gap-4">
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64 sm:w-72 lg:w-full cursor-pointer" onClick={() => handleImageClick(product)}>
                <div className="relative">
                  <img src={product.src} alt={product.title} className="w-full h-auto rounded-lg" />
                  <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <FaHeart className="text-gray-600" />
                  </button>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="text-left">
                    <h3 className="text-lg font-bold">{product.title}</h3>
                    <div className="flex items-center text-xs space-x-2">
                      <p className="text-gray-600">${product.price}</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500 w-3 h-3" />
                        ))}
                      </div>
                      <span className="text-gray-600">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaShoppingCart className="text-gray-600 text-xl cursor-pointer" />
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

export default ProductPage;
