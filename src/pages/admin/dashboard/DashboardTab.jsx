  import React, { useContext, useEffect, useState } from "react";
  import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
  import myContext from "../../../context/data/myContext";
  import { MdOutlineProductionQuantityLimits } from "react-icons/md";
  import { FaUser, FaCartPlus } from "react-icons/fa";
  import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
  import { Link } from "react-router-dom";
  import { fireDB } from "../../../fireabase/FirebaseConfig";
  import { doc, updateDoc } from "firebase/firestore";

  function DashboardTab() {
    const context = useContext(myContext);
    const {
      mode,
      product,
      edithandle,
      deleteProduct,
      order,
      user,
      updateOrderStatus,
    } = context;

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentIdSearchQuery, setPaymentIdSearchQuery] = useState("");

    // Handle search input change
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };

    // Filter products based on search query
    const filteredProducts = product.filter((item) => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase());
    });



    function closeModal() {
      setIsOpen(false);
    }

    function openModal() {
      setIsOpen(true);
    }

    const add = () => {
      window.location.href = "/addproduct";
    };

    // Function to filter orders based on search query
    const filteredOrders = order.filter(
      (item) =>
        item.addressInfo.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        item.paymentId.toLowerCase().includes(paymentIdSearchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.orderStatus.toLowerCase() === statusFilter)
    );

    // Function to handle order status change
    const handleStatusChange = async (paymentId, newStatus) => {
      try {
        await updateOrderStatus(paymentId, newStatus);
        console.log(`Order status for paymentId ${paymentId} updated to ${newStatus}`);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };
    
    return (
      <>
        <div className="">
          <div className="tab container mx-auto">
            <Tabs defaultIndex={0} className=" ">
              <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4 md:justify-center mb-10">
                <Tab>
                  <button
                    type="button"
                    className="font-medium border-b-2 hover:shadow-blue-700 border-blue-500 text-blue-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center bg-[#605d5d12]"
                  >
                    <div className="flex gap-2 items-center">
                      <MdOutlineProductionQuantityLimits />
                      Products
                    </div>{" "}
                  </button>
                </Tab>
                <Tab>
                  <button
                    type="button"
                    className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 hover:shadow-blue-700 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
                  >
                    <div className="flex gap-2 items-center">
                      <AiFillShopping /> Orders
                    </div>
                  </button>
                </Tab>
                <Tab>
                  <button
                    type="button"
                    className="font-medium border-b-2 border-blue-500 bg-[#605d5d12] text-blue-500 rounded-lg text-xl hover:shadow-blue-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)] px-5 py-1.5 text-center"
                  >
                    <div className="flex gap-2 items-center">
                      <FaUser /> Users
                    </div>
                  </button>
                </Tab>
              </TabList>
              <TabPanel>
                <div className="px-4 md:px-0 mb-16">
                  <h1
                    className="text-center mb-5 text-3xl font-semibold underline"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    Product Details
                  </h1>
                  
                  <div className="flex justify-between mb-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Search by title"
                      className="px-4 py-2 border rounded-lg focus:outline-none"
                    />
                    <button
                      onClick={add}
                      type="button"
                      className="focus:outline-none text-white bg-customOrange shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] border hover:bg-pink-700 outline-0 font-medium rounded-lg text-sm px-5 py-2.5"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <div className="flex gap-2 items-center">
                        <FaCartPlus size={30} />
                      </div>
                    </button>
                  </div>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead
                        className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                        style={{
                          backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            S.No
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((item, index) => {
                          const { title, price, imageUrl, category, date } = item;
                          return (
                            <tr
                              key={index}
                              className="bg-gray-50 border-b dark:border-gray-700"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "rgb(46 49 55)" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <td
                                className="px-6 py-4 text-black"
                                style={{ color: mode === "dark" ? "white" : "" }}
                              >
                                {index + 1}.
                              </td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                              >
                                <img className="w-16" src={imageUrl} alt="img" />
                              </th>
                              <td
                                className="px-6 py-4 text-black"
                                style={{ color: mode === "dark" ? "white" : "" }}
                              >
                                {title}
                              </td>
                              <td
                                className="px-6 py-4 text-black"
                                style={{ color: mode === "dark" ? "white" : "" }}
                              >
                                ₹{price}
                              </td>
                              <td
                                className="px-6 py-4 text-black"
                                style={{ color: mode === "dark" ? "white" : "" }}
                              >
                                {category}
                              </td>
                              <td
                                className="px-6 py-4 text-black"
                                style={{ color: mode === "dark" ? "white" : "" }}
                              >
                                {date}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <div
                                    className="flex gap-2 cursor-pointer text-black"
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    <div onClick={() => deleteProduct(item)}>
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
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                      </svg>
                                    </div>
                                    <Link to={"/updateproduct"}>
                                      <div onClick={() => edithandle(item)}>
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
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                          />
                                        </svg>
                                      </div>
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabPanel>

              <TabPanel>
        <div className="relative overflow-x-auto mb-16">
          <h1
            className="text-center mb-5 text-3xl font-semibold underline"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Order Details
          </h1>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
          />
          <input
            type="text"
            placeholder="Search by payment ID"
            value={paymentIdSearchQuery}
            onChange={(e) => setPaymentIdSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4 mx-2"
          />
          {/* Status Filter Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 mb-4 mx-3"
          >
                    <option value="all">All Orders</option>
                    <option value="confirmed">New Orders</option>
                    <option value="returned">Returned Orders</option>
                    <option value="return initiated">Return requests</option>
                    
                
          </select>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead
              className="text-xs text-black uppercase bg-gray-200"
              style={{
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <tr>
                <th scope="col" className="px-6 py-3">Payment Id</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-11 py-3">Shoe Size</th>
                <th scope="col" className="px-6 py-3">Qty.</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-16 py-3">Address</th>
                <th scope="col" className="px-6 py-3">Pincode</th>
                <th scope="col" className="px-6 py-3">Ph. Number</th>
                <th scope="col" className="px-6 py-3 text-center">Email</th>
                <th scope="col" className="px-16 py-3">Date</th>
                <th scope="col" className="px-6 py-3">OrderStatus</th>
                <th scope="col" className="px-16 py-3">Delivery</th>
                <th scope="col" className="px-16 py-3">Return</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((allorder, index) => {
                return allorder.cartItems.map((item, itemIndex) => {
                  const { title, category, imageUrl, price, quantity, size } = item; // Retrieve shoe size from cart item
                  return (
                    <tr
                      key={itemIndex}
                      className="bg-gray-50 border-b  dark:border-gray-700"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <td className="px-6 py-4 text-black">{allorder.paymentId}</td>
                      <td className="px-6 py-4 font-medium text-black whitespace-nowrap">
                        <img className="w-16" src={imageUrl} alt="img" />
                      </td>
                      <td className="px-6 py-4 text-black">{title}</td>
                      <td className="px-6 py-4 text-black">₹{price}</td>
                      <td className="px-6 py-4 text-black text-center">{size}</td>
                      <td className="px-6 py-4 text-black">{item.quantity}</td>
                      <td className="px-6 py-4 text-black">{category}</td>
                      <td className="px-6 py-4 text-black">{allorder.addressInfo.name}</td>
                      <td className="px-6 py-4 text-black">{allorder.addressInfo.address}</td>
                      <td className="px-6 py-4 text-black">{allorder.addressInfo.pincode}</td>
                      <td className="px-6 py-4 text-black">{allorder.addressInfo.phoneNumber}</td>
                      <td className="px-6 py-4 text-black">{allorder.email}</td>
                      <td className="px-6 py-4 text-black">{allorder.date}</td>
                      <td
                        className={`px-6 py-4 ${
                          allorder.orderStatus.toLowerCase() === "confirmed"
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {allorder.orderStatus}
                      </td>
                      <td className="px-6 py-4">
                      <button
                      className={`bg-green-400 text-black p-2 rounded-xl ${allorder.orderStatus.toLowerCase() === 'confirmed' ? '' : 'opacity-50 cursor-not-allowed'}`}
                      onClick={() => handleStatusChange(allorder.paymentId, 'Delivered')}
                      disabled={allorder.orderStatus.toLowerCase() !== 'confirmed'}
    >
                          Order Delivered   
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {/* Button to accept return */}
                        <button
                        className={`bg-red-400 text-black p-2 rounded-xl ${allorder.orderStatus.toLowerCase() === 'return initiated' ? '' : 'opacity-50 cursor-not-allowed'}`}
                        onClick={() => handleStatusChange(allorder.paymentId, 'returned')}
                        disabled={allorder.orderStatus.toLowerCase() !== 'return initiated'}
    >
                          Accept Return
                        </button>
                      </td>
                      
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </TabPanel>

              <TabPanel>
                <div className="relative overflow-x-auto mb-10">
                  <h1
                    className="text-center mb-5 text-3xl font-semibold underline"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    User Details
                  </h1>
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead
                      className="text-xs text-black uppercase bg-gray-200"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Uid
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((item, index) => {
                        const { name, uid, email, date } = item;
                        return (
                          <tr
                            className="bg-gray-50 border-b dark:border-gray-700"
                            style={{
                              backgroundColor:
                                mode === "dark" ? "rgb(46 49 55)" : "",
                              color: mode === "dark" ? "white" : "",
                            }}
                            key={index}
                          >
                            <td className="px-6 py-4 text-black">{index + 1}.</td>
                            <td className="px-6 py-4 text-black">{name}</td>
                            <td className="px-6 py-4 text-black">{email}</td>
                            <td className="px-6 py-4 text-black">{uid}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      </>
    );
  }

  export default DashboardTab;
