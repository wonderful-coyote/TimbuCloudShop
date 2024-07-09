// CheckoutPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useCart } from './CartContext';

const ScrollToTopOnMount = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    email: '',
    phoneNumber: '',
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [couponCode, setCouponCode] = useState('');

  const handleDeliveryChange = (e) => {
    setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    console.log('Order placed', { cart, deliveryDetails, paymentDetails, selectedPaymentMethod });
    navigate('/order-confirmation');
  };

  const handleSaveDetails = () => {
    console.log('Delivery details saved', deliveryDetails);
    // Implement saving logic here
  };

  const paymentMethods = [
    'PayPal', 'Google/Apple Pay', 'American Express', 'Venmo', 'Discover', 'Maestro', 'After Pay', 'Debit or Credit Card'
  ];

  return (
     <ScrollToTopOnMount>
       <div className="min-h-screen flex flex-col">
         <Header />

         <main className="flex-grow container mx-auto mt-8 p-4">
           <h1 className="text-3xl font-bold mb-8">Checkout</h1>

           <div className="lg:flex lg:space-x-8">
             {/* Left Column */}
             <div className="lg:w-1/2 space-y-8">
               {/* Review Products Section */}
               <section className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-2xl font-semibold mb-4">Review Your Order</h2>
                 {cart.map((item, index) => (
                   <div key={index} className="flex items-center border-b py-4">
                     <img src={item.src} alt={item.title} className="w-16 h-16 object-cover rounded-lg mr-4" />
                     <div className="flex-grow">
                       <h3 className="text-lg font-semibold">{item.title}</h3>
                       <p className="text-gray-600">Color: {item.selectedColor}, Size: {item.selectedSize}</p>
                       <p className="text-gray-600">Price: ${item.price} x {item.quantity}</p>
                     </div>
                     <button onClick={() => removeFromCart(index)} className="text-red-500">Remove</button>
                   </div>
                 ))}
               </section>

               {/* Delivery Details Section */}
               <section className="bg-white p-6 rounded-lg shadow relative">
                 <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
                 <button 
                   onClick={handleSaveDetails}
                   className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded"
                 >
                   Save Details
                 </button>
                 <form className="space-y-4">
                   <div className="flex space-x-4">
                     <input
                       type="text"
                       name="firstName"
                       placeholder="First Name"
                       value={deliveryDetails.firstName}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                     <input
                       type="text"
                       name="lastName"
                       placeholder="Last Name"
                       value={deliveryDetails.lastName}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                   </div>
                   <input
                     type="text"
                     name="address"
                     placeholder="Address"
                     value={deliveryDetails.address}
                     onChange={handleDeliveryChange}
                     className="w-full p-2 border rounded"
                     required
                   />
                   <div className="flex space-x-4">
                     <input
                       type="text"
                       name="city"
                       placeholder="City"
                       value={deliveryDetails.city}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                     <input
                       type="text"
                       name="country"
                       placeholder="Country"
                       value={deliveryDetails.country}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                   </div>
                   <div className="flex space-x-4">
                     <input
                       type="email"
                       name="email"
                       placeholder="Email"
                       value={deliveryDetails.email}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                     <input
                       type="tel"
                       name="phoneNumber"
                       placeholder="Phone Number"
                       value={deliveryDetails.phoneNumber}
                       onChange={handleDeliveryChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                   </div>
                 </form>
               </section>

               <button 
                 onClick={() => navigate(-1)}
                 className="w-full bg-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
               >
                 Go back & continue shopping
               </button>
             </div>

             {/* Right Column */}
             <div className="lg:w-1/2 space-y-8 mt-8 lg:mt-0">
               {/* Payment Details Section */}
               <section className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
                 <div className="mb-4">
                   <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
                   <div className="space-y-2">
                     {paymentMethods.map((method) => (
                       <label key={method} className="flex items-center">
                         <input
                           type="radio"
                           name="paymentMethod"
                           value={method}
                           checked={selectedPaymentMethod === method}
                           onChange={() => setSelectedPaymentMethod(method)}
                           className="mr-2"
                           required
                         />
                         {method}
                       </label>
                     ))}
                   </div>
                 </div>
                 <form className="space-y-4">
                   <input
                     type="text"
                     name="cardNumber"
                     placeholder="Card Number"
                     value={paymentDetails.cardNumber}
                     onChange={handlePaymentChange}
                     className="w-full p-2 border rounded"
                     required
                   />
                   <input
                     type="text"
                     name="cardHolderName"
                     placeholder="Card Holder's Name"
                     value={paymentDetails.cardHolderName}
                     onChange={handlePaymentChange}
                     className="w-full p-2 border rounded"
                     required
                   />
                   <div className="flex space-x-4">
                     <input
                       type="text"
                       name="expiryDate"
                       placeholder="MM/YY"
                       value={paymentDetails.expiryDate}
                       onChange={handlePaymentChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                     <input
                       type="text"
                       name="cvv"
                       placeholder="CVV"
                       value={paymentDetails.cvv}
                       onChange={handlePaymentChange}
                       className="w-1/2 p-2 border rounded"
                       required
                     />
                   </div>
                 </form>
               </section>

               {/* Order Summary Section */}
               <section className="bg-white p-6 rounded-lg shadow">
                 <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                 <div className="space-y-2 mb-4">
                   <p className="flex justify-between"><span>Subtotal:</span> <span>${calculateTotal().toFixed(2)}</span></p>
                   <p className="flex justify-between"><span>Shipping:</span> <span>$10.00</span></p>
                   <p className="flex justify-between font-bold"><span>Total:</span> <span>${(calculateTotal() + 10).toFixed(2)}</span></p>
                 </div>
                 <div className="flex space-x-2 mb-4">
                   <input
                     type="text"
                     placeholder="Coupon Code"
                     value={couponCode}
                     onChange={(e) => setCouponCode(e.target.value)}
                     className="flex-grow p-2 border rounded"
                   />
                   <button className="bg-gray-200 px-4 py-2 rounded">Apply</button>
                 </div>
                 <button 
                   onClick={handlePlaceOrder}
                   className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                 >
                   Place Order
                 </button>
                 <p className="mt-4 text-sm text-gray-600">
                   By proceeding, you are automatically accepting the Terms & Conditions
                 </p>
               </section>
             </div>
           </div>
         </main>

         <Footer />
       </div>
     </ScrollToTopOnMount>
  );
};

export default CheckoutPage;