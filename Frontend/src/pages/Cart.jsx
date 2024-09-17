import axios from "axios";
import React, { useState, useEffect } from "react";
import Loader from "../components/loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  const api = import.meta.env.VITE_BACKEND_API;

  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  // get user cart
  const getUserCart = async () => {
    try {
      const response = await axios.get(
        `${api}/user/get-books-from-cart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // console.log(response.data.cart);

      setCart(response.data.cart);
    } catch (error) {
      console.error("Error getting books from cart: ", error);
    }
  };

  // remove from cart
  const deleteFromCart = async (bookId) => {
    try {
      const response = await axios.delete(
        `${api}/user/delete-from-cart/${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response.data);

      toast.success(response.data.message);

      // Update the cart state by filtering out the removed book
      setCart(cart.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error getting book: ", error);
      toast.error(error.response?.data?.message);
    }
  };

  // place order
  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `${api}/user/place-order/${id}`,
        { order: cart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserCart();
  }, []);

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  return (
    <div className="bg-zinc-900 px-12 h-screen">
      {!cart && (
        <div className="w-full h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Cart is empty
            </h1>
            <img
              src="./empty-cart.png"
              alt="empty cart"
              className="lg:h-[50vh] mt-5"
            />
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold mb-8 text-zinc-500">
            Your Cart
          </h1>
          {cart.map((currBook, index) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
              key={index}
            >
              <img
                src={currBook.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />

              <div className="w-full md:w-auto">
                <h1 className="text-2xl font-semibold text-zinc-100 text-center mt-2 md:mt-5-0">
                  {currBook.title}
                </h1>
                <p className=" text-zinc-300 mt-2 hidden lg:block">
                  {currBook.desc.slice(0, 100)}...
                </p>
                <p className="  text-zinc-300 mt-2 hidden md:block lg:hidden">
                  {currBook.desc.slice(0, 65)}...
                </p>
                <p className=" text-zinc-300 mt-2 md:hidden block">
                  {currBook.desc.slice(0, 100)}...
                </p>
              </div>

              <div className="flex mt-4 w-full md:w-auto items-center justify-center">
                <h2 className="text-zinc-100 text-3xl font-semibold flex ">
                  ₹ {currBook.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteFromCart(currBook._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end ">
          <div className="p-4 bg-zinc-800 rounded">
            <h1 className="text-3xl text-zinc-300 font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
              <h2>{cart.length} books </h2> <h2> ₹ {total}</h2>
            </div>
            <div className="w-[100%] mt-3 ">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                onClick={placeOrder}
              >
                Place your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
