import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateCartItemQuantity, updateCartItemSize } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../fireabase/FirebaseConfig";
import { useLocation } from "react-router-dom";

function Cart() {
  const context = useContext(myContext);
  const { mode } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Deleted from cart");
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // prevent quantity from being less than 1
    if (quantity > 5) {
      toast.error("Cannot add more than 5 quantities", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      const price = parseFloat(cartItem.price.replace(/[₹,]/g, ""));
      if (!isNaN(price)) {
        temp += price * cartItem.quantity; // Multiply price by quantity
      }
    });
    setTotalAmount(temp); 
  }, [cartItems]);

  const shipping = 99;
  const grandTotal = shipping + totalAmount;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [errors, setErrors] = useState({ name: '', address: '', pincode: '', phoneNumber: '' });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedSizeParam = parseInt(searchParams.get("size")) || 6; // Default to 6 if not found

  const validate = () => {
    let valid = true;
    let errors = {};

    if (!name || !/^[a-zA-Z]+$/.test(name)) {
      errors.name = "Name is required and should not contain spaces, numbers or special characters";
      valid = false;
    }

    if (!address) {
      errors.address = "Address is required";
      valid = false;
    }

    if (!pincode || !/^\d{6}$/.test(pincode)) {
      errors.pincode = "Valid pincode is required";
      valid = false;
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const buyNow = async () => {
    if (!validate()) {
      toast.error("Please correct the errors before proceeding", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    var options = {
      key: "rzp_test_gOPhnpDC96Mue9",
      key_secret: "KjkPiRk4aGEFDAcuLRh0AnMn",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "ShoeSnap",
      description: "for testing purpose",
      handler: function (response) {
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          orderStatus: "confirmed",
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  const handleSizeChange = (id, size) => {
    dispatch(updateCartItemSize({ id, size }));
  };
  
  return (
    <Layout>
      <div
        className="min-h-screen bg-gray-100 pt-5 mb-[0%]"
        style={{
          backgroundColor: mode === "dark" ? "#282c34" : "",
          color: mode === "dark" ? "white" : "",
        }}
      >
        <h1 className="mb-20 text-center text-5xl" style={{fontFamily: 'monospace', color: 'grey', fontWeight:600 }}>My Cart</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl, id, quantity, size } = item;
              return (
                <div
                  key={index}
                  className="justify-between mb-6 h-60 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                  style={{
                    backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                    color: mode === "dark" ? "white" : "",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-0 sm:mt-0">  
                      <h2
                        className="text-lg font-bold text-gray-900"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        {title}
                      </h2>

                      <p
                        className="mt-1 text-md font-semibold text-gray-700"
                        style={{ color: mode === "dark" ? "white" : "" }}
                      >
                        ₹{price}
                      </p>
                      <div className="mt-1">
                        <label className="mr-2 text-sm font-semibold text-gray-700">
                          Quantity:
                        </label>
                        <input
                          type="number"
                          value={quantity}
                          min="1"
                          onChange={(e) =>
                            handleQuantityChange(id, parseInt(e.target.value))
                          }
                          className="w-14 px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div className="mt-1">
                        <h3 className="font-bold text-sm pb-2">Shoe Size Chart</h3>
                        <div className="shoe-size-chart mb-0">
                          <div className="size-row p-0 text-xs text-center">
                            {[6, 7, 8, 9, 10].map((sizeOption) => (
                              <div key={sizeOption} className={`w-8 h-8 size-option ${size === sizeOption ? 'selected' : ''}`} onClick={() => handleSizeChange(id, sizeOption)}>
                                <p>{sizeOption}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div
                      onClick={() => deleteCart(item)}
                      className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-6 h-full rounded-lg border bg-white p-6 drop-shadow-xl md:mt-0 md:w-1/3"
            style={{
              backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
              color: mode === "dark" ? "white" : "",
            }}
          >
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                Subtotal
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                ₹{totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                Shipping
              </p>
              <p className="text-gray-700" style={{ color: mode === "dark" ? "white" : "" }}>
                ₹{shipping.toFixed(2)}
              </p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold" style={{ color: mode === "dark" ? "white" : "" }}>
                Total
              </p>
              <div className="">
                <p
                  className="mb-1 text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{grandTotal.toFixed(2)} INR
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4"> 
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              <textarea
                className="p-2 border border-gray-300 rounded"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
              {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
              <input
                type="text"
                className="p-2 border border-gray-300 rounded"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
              <button
                onClick={buyNow}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
