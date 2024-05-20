import React, { useContext, useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import myContext from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import Loader from '../../components/loader/Loader';
import StarRatings from 'react-star-ratings';
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../fireabase/FirebaseConfig';

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid;
  const context = useContext(myContext);
  const { mode, loading, order, getProductReviews } = context;

  const [feedbacks, setFeedbacks] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    order.forEach((orderItem) => {
      orderItem.cartItems.forEach((item) => {
        getProductReviews(item.id); // Fetch reviews for each product
      });
    });
  }, [order]);

  const handleFeedbackChange = (orderId, value) => {
    setFeedbacks((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleRatingChange = (orderId, value) => {
    setRatings((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleSubmitFeedback = async (orderId, productId) => {
    try {
      const feedbackContent = feedbacks[orderId] || '';
      const rating = ratings[orderId] || 0;

      if (feedbackContent.trim() === '') {
        return toast.error("Feedback content cannot be empty");
      }

      if (rating === 0) {
        return toast.error("Please provide a rating");
      }

      const reviewData = {
        orderId: orderId,
        userId: userid,
        productId: productId, // Include productId
        feedback: feedbackContent,
        rating: rating,
        timestamp: Timestamp.now()
      };

      const reviewRef = collection(fireDB, 'reviews');
      await addDoc(reviewRef, reviewData);

      setFeedbacks((prev) => ({ ...prev, [orderId]: '' }));
      setRatings((prev) => ({ ...prev, [orderId]: 0 }));

      toast.success("Feedback submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Layout>
      <h1 className='text-5xl text-slate-700 text-monospace text-center mt-5 mb-5'>My Orders</h1>
      {loading && <Loader />}
      {order.length > 0 ? (
        <div className="h-full pt-10">
          {order.filter(obj => obj.userid === userid).map((order, orderIndex) => (
            <div key={orderIndex} className="mx-auto max-w-5xl justify-center px-6 flex flex-col space-y-6 xl:px-0">
              {order.cartItems.map((item, itemIndex) => (
                <div key={itemIndex} className="rounded-lg">
                  <div className="mb-6 rounded-lg bg-white p-6 shadow-md flex flex-col sm:flex-row sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                    <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                        <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                      </div>
                    </div>
                    <div className='w-50 mt-4 sm:mt-0'>
                      <h1 className="text-sm text-monospace text-gray-900 mb-3">Order: {order.orderStatus}</h1>
                      <h1 className="text-sm text-monospace text-gray-900 mb-3">Date: {order.date}</h1>
                    </div>
                  </div>
                  {/* Review Form */}
                  <div className="mt-4 pb-5">
                    <h2 className="text-gray-900 text-xl font-medium mb-2">
                      Leave a Review
                    </h2>
                    <div className="flex items-center mb-4">
                      <span className="text-gray-700 mr-2">Rating:</span>
                      <div className="mt-4">
                        <StarRatings
                          rating={ratings[order.paymentId] || 0}
                          starRatedColor="orange"
                          changeRating={(value) => handleRatingChange(order.paymentId, value)}
                          numberOfStars={5}
                          name="rating"
                          starDimension="3rem"
                          starSpacing="0"
                          svgIconPath="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
                        />
                      </div>
                    </div>
                    <textarea
                      className="w-full h-32 px-4 py-2 text-base placeholder-gray-500 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your feedback here..."
                      value={feedbacks[order.paymentId] || ''}
                      onChange={(e) => handleFeedbackChange(order.paymentId, e.target.value)}
                    ></textarea>
                    <button
                      onClick={() => handleSubmitFeedback(order.paymentId, item.id)}
                      className="mt-4 bg-customOrange text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full mb-44">
          <h2 className="text-center text-2xl text-black mb-4 mt-10">No Orders</h2>
          <FaShoppingCart className="text-6xl text-gray-400" />
        </div>
      )}
    </Layout>
  );
}

export default Order;
