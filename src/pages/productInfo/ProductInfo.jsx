import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, getDocs, collection, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";
import { fireDB } from "../../fireabase/FirebaseConfig";
import StarRatings from 'react-star-ratings';
import './ProductInfor.css';
import { Link } from "react-router-dom";

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
  const [selectedSize, setSelectedSize] = useState(null); // State to track selected shoe size
  const [selectedQuantity, setSelectedQuantity] = useState(1); // State to track selected quantity

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  // Add to cart
  const addCart = (products) => {
    const productToAdd = { ...products, size: selectedSize, quantity: selectedQuantity }; // Include selected size and quantity in product data
    dispatch(addToCart(productToAdd));
    toast.success("Added to cart");
  };

  // Add to wishlist
  const addWishlist = (products) => {
    dispatch(addToWishlist(products));
    toast.success("Added to wishlist");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

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

  // Function to handle change in selected shoe size
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Function to handle change in selected quantity
  const handleQuantityChange = (e) => {
    setSelectedQuantity(parseInt(e.target.value));
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          {products && (
            <div className="lg:w-5/5 mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-auto object-cover object-center rounded"
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
        <h3 className="font-bold pb-3">Shoe Size Chart</h3>
        <div className="shoe-size-chart mb-5">
          <div className="size-row p-2 text-center">
            {/* Shoe size options */}
            {[6, 7, 8, 9, 10].map((size) => (
              <div
                key={size}
                className={`w-10 h-10 size-option ${selectedSize === size ? 'selected' : ''}`}
                onClick={() => handleSizeChange(size)}
              >
                <p>{size}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Quantity selection */}
        {/* <div className="mb-4">
          <label className="font-bold mr-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={selectedQuantity}
            onChange={handleQuantityChange}
            className="border rounded p-1 w-20"
          />
        </div> */}
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ₹{products.price}
                  </span>
                  <button
                    onClick={() => addCart(products)}
                    className="flex ml-auto text-white bg-customOrange border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    <Link to={`/cart?size=${selectedSize}`}>
                      Add To Cart
                    </Link>
                  </button>
                  <button
                    onClick={() => addWishlist(products)}
                    className="flex ml-4 text-white bg-customOrange border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    Add To Wishlist
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
                          {users[review.userId]?.name || "Buyer"}
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
