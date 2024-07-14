//main.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTruck,
  FaHeadset,
  FaTag,
  FaStar,
  FaShoppingCart,
  FaEye,
  FaHeart,
} from "react-icons/fa";
import axios from "axios";

const ScrollToTopOnMount = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

const Main = () => {
  const navigate = useNavigate();

  // Frame 3 states
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Frame 6 states
  const [dealOfDay, setDealOfDay] = useState([]);

  // Frame 7 states
  const [allProducts, setAllProducts] = useState([]);
  const [currentPageFrame7, setCurrentPageFrame7] = useState(1);
  const productsPerPageFrame7 = 9;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPrice = (product) => {
    if (
      product.current_price &&
      Array.isArray(product.current_price) &&
      product.current_price.length > 0
    ) {
      const priceObj = product.current_price[0];
      const currency = Object.keys(priceObj)[0];
      if (Array.isArray(priceObj[currency]) && priceObj[currency].length > 0) {
        return priceObj[currency][0];
      }
    }
    return "N/A";
  };

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
        console.log("API response:", response.data);
        if (response.data && Array.isArray(response.data.items)) {
          const allProductsData = response.data.items;

          setProducts(allProductsData);

          const shuffledForDealOfDay = [...allProductsData].sort(
            () => 0.5 - Math.random()
          );
          setDealOfDay(shuffledForDealOfDay.slice(0, 3));

          setAllProducts(allProductsData);
        } else {
          setError("Unexpected API response structure");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    navigate("/product-page", { 
      state: { 
        productId: product.id,
        // Remove or set default values for discountApplied and discountPercentage
        discountApplied: false,
        discountPercentage: 0
      } 
    });
  };

  const handleDealClick = (deal) => {
    navigate("/product-page", {
      state: {
        productId: deal.id,
        discountApplied: true,
        discountPercentage: 50
      },
    });
  };

  // Pagination for Frame 3
  const paginateFrame3 = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastProductFrame3 = currentPage * productsPerPage;
  const indexOfFirstProductFrame3 = indexOfLastProductFrame3 - productsPerPage;
  const currentProductsFrame3 = products.slice(
    indexOfFirstProductFrame3,
    indexOfLastProductFrame3
  );

  // Pagination for Frame 7
  const paginateFrame7 = (pageNumber) => setCurrentPageFrame7(pageNumber);
  const indexOfLastProductFrame7 = currentPageFrame7 * productsPerPageFrame7;
  const indexOfFirstProductFrame7 = indexOfLastProductFrame7 - productsPerPageFrame7;
  const currentProductsFrame7 = allProducts.slice(indexOfFirstProductFrame7, indexOfLastProductFrame7);

  const getImageUrl = (product) => {
    if (product.photos && product.photos.length > 0 && product.photos[0].url) {
      return `https://api.timbu.cloud/images/${product.photos[0].url}`;
    }
    return "https://via.placeholder.com/300x300.png?text=No+Image";
  };

  return (
    <ScrollToTopOnMount>
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
          <h2 className="text-3xl font-bold text-center">
            Explore Our New Collection
          </h2>
          <p className="text-gray-600 text-center mt-4">
            Discover our latest arrivals featuring the freshest designs and
            cutting-edge styles. Elevate your sneaker game with our new
            collection, crafted for comfort and built for performance.
          </p>
          <div className="relative">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : products.length > 0 ? (
              <div
                className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-4"
                id="new-collection-slider"
              >
                {currentProductsFrame3.map((product) => (
                  <div
                    key={product.id}
                    className="relative min-w-full lg:min-w-0 aspect-[4/3]"
                  >
                    <img
                      src={getImageUrl(product)}
                      alt={product.name}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleProductClick(product)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/300x300.png?text=Image+Not+Found";
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col justify-between p-2">
                      <div className="self-end">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                          <FaHeart className="text-gray-600" />
                        </button>
                      </div>
                      <div className="self-end">
                        <button
                          onClick={() => handleProductClick(product)}
                          className="flex items-center bg-black text-white border border-transparent px-4 py-2 rounded-lg shadow-md hover:bg-white hover:text-black hover:border-black transition duration-300"
                        >
                          <FaEye className="mr-2" />
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found.</p>
            )}
            {products.length > 0 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from(
                  { length: Math.ceil(products.length / productsPerPage) },
                  (_, i) => (
                    <button
                      key={i}
                      className={`w-10 h-10 flex items-center justify-center rounded-full ${
                        currentPage === i + 1
                          ? "bg-black text-white"
                          : "bg-gray-200"
                      }`}
                      onClick={() => paginateFrame3(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* Frame 4 */}
        <section className="mt-10 bg-offwhite p-10 rounded-lg flex flex-col lg:flex-row items-center justify-between shadow-md">
          <div className="text-left">
            <h2 className="text-3xl font-bold">Take advantage of the ongoing 'Buy one Get One free'</h2>
            <p className="mt-4 text-gray-600">Don't miss out on our incredible 'Buy One, Get One Free' offer! Double your style and savings with this limited-time deal</p>
            <button className="mt-6 px-6 py-2 bg-black text-white rounded-full">Buy now</button>
          </div>
          <img src="./timbu/adbb9d9b9c2b5d72c5c9d2c28d23e0cd8bb747a7.png" alt="Promo" className="w-96 h-auto" />
        </section>

        {/* Frame 6 */}
        <section className="mt-10 bg-offwhite p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Deal of the day
          </h2>
          <div className="flex overflow-x-auto pb-10 lg:pb-5 lg:grid lg:grid-cols-3 gap-4">
            {dealOfDay.map((deal) => (
              <div
                key={deal.id}
                className="flex-shrink-0 w-64 sm:w-72 lg:w-full relative bg-white rounded-lg shadow-md cursor-pointer"
                onClick={() => handleProductClick(deal)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={getImageUrl(deal)}
                    alt={deal.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 flex items-center justify-center"
                    style={{ height: "25%" }}
                  >
                    <button
                      className="px-4 py-2 bg-black text-white rounded-full text-sm whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDealClick(deal);
                      }}
                    >
                      Get 50% OFF
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold truncate">{deal.name}</h3>
                  <p className="text-gray-600">${getPrice(deal)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frame 7 */}
        <section className="mt-10 bg-white p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center">Sneakers for you</h2>
          <div className="relative">
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentProductsFrame7.map((product) => (
                    <div key={product.id} className="relative cursor-pointer flex-shrink-0 w-full" onClick={() => handleProductClick(product)}>
                      <img 
                        src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
                        alt={product.name} 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                      <button 
                        className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Add to favorites functionality here
                        }}
                      >
                        <FaHeart className="text-gray-600" />
                      </button>
                      <div className="mt-2 flex justify-between">
                        <div className="text-left">
                          <h3 className="text-xl font-bold truncate">{product.name}</h3>
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

                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from(
                    { length: Math.ceil(allProducts.length / productsPerPageFrame7) },
                    (_, i) => (
                      <button
                        key={i}
                        className={`w-10 h-10 flex items-center justify-center rounded-full ${
                          currentPageFrame7 === i + 1
                            ? "bg-black text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                        }`}
                        onClick={() => paginateFrame7(i + 1)}
                      >
                        {i + 1}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Frame 8 */}
        <section className="mt-10 bg-offwhite p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-md overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-bold text-center">You in our sneakers</h2>
          <p className="text-gray-600 text-center mt-4">Snap a photo of yourself in our sneakers and share it with our online community</p>
          <div className="mt-6 flex overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 lg:grid lg:grid-cols-3 gap-4">
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid grid-rows-2 gap-4">
              <img src="./timbu/a772c09ee034e7e61b4ae6f05541619fa3a74afc.jpg" alt="User" className="w-full h-auto" />
              <img src="./timbu/5d9ebd3886da5539cb6e03c0364d155b69e22eeb.jpg" alt="User" className="w-full h-auto" />
            </div>
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid gap-4">
              <img src="./timbu/6a55c64cbf21fe7c0192119160185ac0195ae09e.jpg" alt="User" className="w-full h-auto" />
              <div className="grid grid-cols-2 gap-4">
                <img src="./timbu/f82de9a34a5760fb2e2b0e156d0514e1b265c8ed.jpg" alt="User" className="w-full h-auto" />
                <img src="./timbu/f85052a4f4c745ae5f3f61ec26c26bd555f23a6a.jpg" alt="User" className="w-full h-auto" />
              </div>
            </div>
            <div className="flex-shrink-0 w-64 sm:w-72 lg:w-full grid grid-rows-2 gap-4">
              <img src="./timbu/e0f7986b469b384b4c61b3e3f0822187399aa944.jpg" alt="User" className="w-full h-auto" />
              <img src="./timbu/1bd87534efd51cac728df36730cd91e65ba336d9.jpg" alt="User" className="w-full h-auto" />
            </div>
          </div>
        </section>
      </main>
    </ScrollToTopOnMount>
  );
};

export default Main;