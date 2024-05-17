import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import StarRatings from 'react-star-ratings';

function ProductInfo() {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState({});
  const [products, setProducts] = useState("");
  const params = useParams();
  const [reviewContent, setReviewContent] = useState('');
  const [feedbackContent, setFeedbackContent] = useState(""); 
  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Add to cart
  const addCart = (products) => {
    dispatch(addToCart(products));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProducts(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getReviews = async () => {
    setLoading(true);
    try {
      const reviewsQuery = query(
        collection(fireDB, "reviews"),
        where("productId", "==", params.id)
      );
      const snapshot = await getDocs(reviewsQuery);
      const reviewsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
  
      // Fetch user details for each review
      const userIds = [...new Set(reviewsData.map(review => review.userId))];
      const usersData = {};
      await Promise.all(userIds.map(async (userId) => {
        const userDoc = await getDoc(doc(fireDB, "users", userId));
        if (userDoc.exists()) {
          usersData[userId] = userDoc.data();
        }
      }));
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.id]);

  useEffect(() => {
    getReviews();
  }, [params.id]);

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/3 w-full lg:h-auto object-cover object-center rounded"
                src={products.imageUrl}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  ShoeSnap Exclusive
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {products.title}
                </h1>
                <p className="leading-relaxed border-b-2 mb-5 pb-5">
                  {products.description}
                </p>
                {/* Display product features */}
                {products.features && (
                  <div className="mb-4">
                    <h2 className="text-gray-900 font-bold mb-2">Features:</h2>
                    <ul className="list-disc list-inside">
                      {products.features.split(",").map((feature, index) => (
                        <li key={index}>{feature.trim()}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{products.price}
                  </span>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-customOrange border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="lg:w-full w-full lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-gray-900 text-3xl title-font font-medium mb-2">
                  Reviews
                </h2>
                <div className="mb-4">
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center mb-2">
                          <span className="text-gray-700 mr-2">Rating:</span>
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="orange"
                            numberOfStars={5}
                            name="rating"
                            starDimension="1.5rem"
                            starSpacing="0"
                            svgIconPath= "M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
                          />
                        </div>
                        <p className="text-gray-600 mb-2">
                          {users[review.userId]?.name || "Anonymous"}
                        </p>
                        <p>{review.feedback}</p>
                      </div>
                    ))
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;
