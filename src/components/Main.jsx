//Main.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTruck, FaHeadset, FaTag, FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';

const Main = () => {
  const navigate = useNavigate();

  const handleImageClick = (product) => {
    navigate('/product-page', { state: { product } });
  };
  
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const addToFavorites = (product) => {
    setFavorites([...favorites, product]);
  };


  return (
      <main className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
      {/* Frame 1 */}
      <section className="bg-white p-10 rounded-lg flex flex-col lg:flex-row items-center justify-between shadow-md">
        <div className="text-left">
          <h1 className="text-4xl font-bold">Discover your perfect <span className="text-rose-600">sneakers</span> here</h1>
          <p className="mt-4 text-gray-600">Explore the latest trends and timeless classics in sneakers, all in one place: from casual kicks to high-performance athletic shoes. We've got your feet covered</p>
          <button className="mt-6 px-6 py-2 bg-black text-white rounded-full">Explore now</button>
        </div>
        <img src="./timbu/5da98e95d9a978d0916cf3f939bf03bd224a041c.jpg" alt="Sneaker" className="w-96 h-auto" />
      </section>

      {/* Frame 2 */}
        <section className="mt-10 bg-offwhite p-4 sm:p-6 rounded-lg shadow-md">
          <div className="bg-white p-4 sm:p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center">
                <FaTruck className="text-gray-600 mr-2" />
                <div>
                  <h2 className="text-2xl font-bold">Free Delivery</h2>
                  <p className="text-gray-600">On every order over $100</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaHeadset className="text-gray-600 mr-2" />
                <div>
                  <h2 className="text-2xl font-bold">Online Support</h2>
                  <p className="text-gray-600">A 24hours customer care</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaTag className="text-gray-600 mr-2" />
                <div>
                  <h2 className="text-2xl font-bold">Discounted Sale</h2>
                  <p className="text-gray-600">20% discount off sales above $250</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Frame 3 */}
      <section className="mt-10 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Explore Our New Collection</h2>
        <p className="text-gray-600 text-center mt-4">
          Discover our latest arrivals featuring the freshest designs and cutting-edge styles. Elevate your sneaker game with our new collection, crafted for comfort and built for performance.
        </p>
        <div className="relative">
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4 overflow-x-auto scroll-smooth" id="new-collection-slider">
            {[
              "./timbu/4823dc17f121b8bb2cfe033ef502a41c384a9d24.jpg",
              "./timbu/4b827fbef68ccaffaf57b577861cd3c78c53e7d7.jpg",
              "./timbu/WhatsApp Image 2024-07-08 at 09.23.36_022ab817.jpg",
              "./timbu/WhatsApp Image 2024-07-08 at 09.23.28_7ffaacb7.jpg"
            ].map((src, i) => (
              <div key={i} className="relative min-w-full lg:min-w-0">
                <img src={src} alt={`Sneaker ${i + 1}`} className="w-full h-auto" />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                  <FaHeart className="text-gray-600" />
                </button>
                <button className="absolute bottom-2 right-2 bg-white px-3 py-2 rounded-full shadow-md flex items-center">
                  <FaShoppingCart className="mr-2 text-gray-600" /> Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('new-collection-slider').scrollLeft -= 300}>1</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('new-collection-slider').scrollLeft += 300}>2</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('new-collection-slider').scrollLeft += 600}>3</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('new-collection-slider').scrollLeft += 900}>&gt;</button>
          </div>
        </div>
      </section>



      {/* Frame 4 */}
      <section className="mt-10 bg-offwhite p-10 rounded-lg flex flex-col lg:flex-row items-center justify-between shadow-md">
        <div className="text-left">
          <h2 className="text-3xl font-bold">Take advantage of the ongoing ‘Buy one Get One free’</h2>
          <p className="mt-4 text-gray-600">Don't miss out on our incredible 'Buy One, Get One Free' offer! Double your style and savings with this limited-time deal</p>
          <button className="mt-6 px-6 py-2 bg-black text-white rounded-full">Buy now</button>
        </div>
        <img src="src/timbu/adbb9d9b9c2b5d72c5c9d2c28d23e0cd8bb747a7.png" alt="Promo" className="w-96 h-auto" />
      </section>


        {/* Frame 5 */}
        <section className="mt-10 bg-white p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Recently viewed</h2>
          <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {[

              { id: 1, src: "src/timbu/1c806e1deb3638a0305ae3d8d7aeaa4a95b7efec.jpg", title: "Nike Airforce 1’ 07", price: 80, reviews: 100 },
              { id: 2, src: "src/timbu/3d2d017cd58ce4025c7580580112012b97eb4aa8.jpg", title: "Nike Air Max 90", price: 85, reviews: 120 },
              { id: 3, src: "src/timbu/e86e4ccedb1bca3b1ba8e1e3c7f0512ce535eaa4.jpg", title: "Air Jordan 13 R.", price: 95, reviews: 90 },
              { id: 4, src: "src/timbu/d5234822891031f94bbc728926060de81e751d57.jpg", title: "Air Jordan Retro", price: 100, reviews: 110 },
              { id: 5, src: "src/timbu/f7de98a0280bf85083fb2e3c87457ab9ad1e65a0.jpg", title: "Nike Free Metcon", price: 90, reviews: 95 },
              { id: 6, src: "src/timbu/35fdb09b153eef1bc923ed13237b045a4fd6c136.jpg", title: "Nike Airforce 4", price: 85, reviews: 105 }
            ].map((product) => (
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




        {/* Frame 6 */}
        <section className="mt-10 bg-offwhite p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Deal of the day</h2>
          <div className="flex overflow-x-auto pb-4 lg:pb-0 lg:grid lg:grid-cols-3 gap-4">
            {[
              "src/timbu/WhatsApp Image 2024-07-08 at 08.33.00_c613d554.jpg",
              "src/timbu/WhatsApp Image 2024-07-08 at 08.29.57_0644badc.jpg",
              "src/timbu/WhatsApp Image 2024-07-08 at 08.30.03_448e87b0.jpg"
            ].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-64 sm:w-72 lg:w-full relative bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <img src={src} alt={`Deal ${i + 1}`} className="w-full h-auto" />
                <button className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black text-white rounded-full text-sm">
                  Get 50% OFF
                </button>
              </div>
            ))}
          </div>
        </section>


      {/* Frame 7 */}
      <section className="mt-10 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Sneakers for you</h2>
        <div className="relative">
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto scroll-smooth" id="product-slider">
            {[
              { id: 1, src: "src/timbu/25105d164850b1a45cf811ed1707809767ef97de.jpg", title: "Vans Airfield 3", price: 80, reviews: 100 },
              { id: 2, src: "src/timbu/3d2d017cd58ce4025c7580580112012b97eb4aa8.jpg", title: "Nike Airforce 1", price: 85, reviews: 120 },
              { id: 3, src: "src/timbu/b53dee6fc09d923608c2e3b07a60845cf4fbea56.jpg", title: "Puma and Lamelo", price: 95, reviews: 90 },
              { id: 4, src: "src/timbu/272e4d7b8e2dc59b4eca8d09363fc4027af9e813.jpg", title: "Nitro Elite 3", price: 100, reviews: 110 },
              { id: 5, src: "src/timbu/6c2945c3bbe52ba7d0e8d80f17ed01c16e042abd.jpg", title: "Palermo leather", price: 90, reviews: 95 },
              { id: 6, src: "src/timbu/13a92b07c0a40b09d6f1a86719368dec8a1e8ca8.jpg", title: "Team Big Kids", price: 85, reviews: 105 },
              { id: 7, src: "src/timbu/de4bef426a1f8a8f0e306710e10e0192258ebd1e.jpg", title: "Amour Big Kids", price: 75, reviews: 98 },
              { id: 8, src: "src/timbu/041af138c98bd2b9111298d581cbeb4e7a69b3a4.jpg", title: "Nano Court T.S", price: 110, reviews: 115 },
              { id: 9, src: "src/timbu/59e602dad5a7dca654166b3a66154b60f7a6579c.jpg", title: "Panini Pres. 94", price: 120, reviews: 130 },
              { id: 10, src: "src/timbu/1e0c41ff262be9b30fe552158754546fca8a8dee.jpg", title: "Nano X4", price: 95, reviews: 105 },
              { id: 11, src: "src/timbu/55137142ae0bfd3f2660b4fa388ca709e0bf5f1c.jpg", title: "Club C Grounds", price: 85, reviews: 100 },
              { id: 12, src: "src/timbu/baa2ce7c4d99969ebf8b0df7a974bac639a4a277.jpg", title: "Panini ES22", price: 130, reviews: 140 }
            ].map((product) => (
              <div key={product.id} className="relative min-w-full md:min-w-0 cursor-pointer" onClick={() => handleImageClick(product)}>
                <img src={product.src} alt={product.title} className="w-full h-auto rounded-lg" />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                  <FaHeart className="text-gray-600" />
                </button>
                <div className="mt-2 flex justify-between">
                  <div className="text-left">
                    <h3 className="text-xl font-bold">{product.title}</h3>
                    <div className="flex items-center text-xs space-x-2">
                      <p className="text-gray-600">${product.price}</p>
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <span className="text-gray-600">({product.reviews} reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaShoppingCart className="text-gray-600 text-2xl cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('product-slider').scrollLeft -= 300}>1</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('product-slider').scrollLeft += 300}>2</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('product-slider').scrollLeft += 600}>3</button>
            <button className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-full" onClick={() => document.getElementById('product-slider').scrollLeft += 900}>&gt;</button>
          </div>
        </div>
      </section>




      {/* Frame 8 */}
        <section className="mt-10 bg-offwhite p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">You in our sneakers</h2>
          <p className="text-gray-600 text-center mt-4">Snap a photo of yourself in our sneakers and share it with our online community</p>
          <div className="mt-6 flex overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 lg:grid lg:grid-cols-3 gap-4">
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid grid-rows-2 gap-4">
              <img src="src/timbu/a772c09ee034e7e61b4ae6f05541619fa3a74afc.jpg" alt="User" className="w-full h-auto" />
              <img src="src/timbu/5d9ebd3886da5539cb6e03c0364d155b69e22eeb.jpg" alt="User" className="w-full h-auto" />
            </div>
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid gap-4">
              <img src="src/timbu/6a55c64cbf21fe7c0192119160185ac0195ae09e.jpg" alt="User" className="w-full h-auto" />
              <div className="grid grid-cols-2 gap-4">
                <img src="src/timbu/f82de9a34a5760fb2e2b0e156d0514e1b265c8ed.jpg" alt="User" className="w-full h-auto" />
                <img src="src/timbu/f85052a4f4c745ae5f3f61ec26c26bd555f23a6a.jpg" alt="User" className="w-full h-auto" />
              </div>
            </div>
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid grid-rows-2 gap-4">
              <img src="src/timbu/e0f7986b469b384b4c61b3e3f0822187399aa944.jpg" alt="User" className="w-full h-auto" />
              <img src="src/timbu/1bd87534efd51cac728df36730cd91e65ba336d9.jpg" alt="User" className="w-full h-auto" />
            </div>
          </div>
        </section>

      {/* Slider */}
      <div className="mt-10 flex justify-center space-x-2">
        <div className="w-4 h-4 bg-black rounded-full"></div>
        <div className="w-4 h-4 bg-offwhite rounded-full"></div>
        <div className="w-4 h-4 bg-offwhite rounded-full"></div>
      </div>
    </main>
  );
};

export default Main;
