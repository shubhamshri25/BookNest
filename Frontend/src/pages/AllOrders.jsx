import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck, FaUserLarge } from "react-icons/fa6";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [option, setOption] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const api = import.meta.env.VITE_BACKEND_API;
  const token = localStorage.getItem("token");

  // Fetch all orders
  const allOrders = async () => {
    try {
      const response = await axios.get(`${api}/admin/order/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error getting orders", error);
      toast.error(error.response?.data?.message || "Failed to load orders.");
    }
  };

  // handling the chnage order status via options
  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  // Update order status
  const changeStatus = async (index) => {
    const id = orders[index]._id; // Use the correct order id from the orders array
    try {
      const response = await axios.put(
        `${api}/admin/order/update-order-status/${id}`,
        values,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      allOrders(); // Refresh orders list after update
    } catch (error) {
      console.error("Error updating order status", error);
      toast.error("Failed to update order status.");
    }
  };

  useEffect(() => {
    allOrders();
  }, [orders]);

  return (
    <>
      {!orders && (
        <div className="h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      )}
      {orders && orders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100 ">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>

            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>

            <div className=" w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>

            <div className=" w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>

            <div className=" w-[30%] md:w-[16%]">
              <h1 className="">Status</h1>
            </div>

            <div className="w-[10%] md:w-[5%] ">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>

          {orders.map((currOrder, index) => (
            <div
              key={index}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300  "
            >
              <div className="w-[3%]">
                <h1 className="text-center">{index + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${currOrder.book._id}`}
                  className="hover:text-blue-500"
                >
                  {currOrder.book.title}
                </Link>
              </div>

              <div className=" w-0 hidden md:block md:w-[45%]">
                <h1 className="">{currOrder.book.desc.slice(0, 50)} ...</h1>
              </div>

              <div className=" w-[17%] md:w-[9%]">
                <h1 className="">{currOrder.book.price}</h1>
              </div>

              <div className=" w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOption(index)}
                  >
                    {currOrder.status === "Order placed" ? (
                      <div className="text-yellow-500">{currOrder.status}</div>
                    ) : currOrder.status === "Cancelled" ? (
                      <div className="text-red-500">{currOrder.status}</div>
                    ) : (
                      <div className="text-green-500">{currOrder.status}</div>
                    )}
                  </button>
                  <div
                    className={`${
                      option === index ? "block" : "hidden "
                    } flex mt-4`}
                  >
                    <select
                      name="status"
                      id=""
                      className="bg-gray-800"
                      onChange={change}
                      value={values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Cancelled",
                      ].map((items, index) => (
                        <option value={items} key={index}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-500 mx-2"
                      onClick={() => {
                        setOption(-1);
                        changeStatus(index);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>

              <div className="w-[10%] md:w-[5%] ">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(currOrder.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          userDivData={userDivData}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
