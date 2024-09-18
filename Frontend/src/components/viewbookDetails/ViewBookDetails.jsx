import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState("");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // console.log(isLoggedIn, role);

  const api = import.meta.env.VITE_BACKEND_API;

  // get book detail
  const getBookDetail = async () => {
    try {
      const response = await axios.get(`${api}/books/book-by-id/${id}`);
      // console.log(response.data.book);
      setBook(response.data.book);
    } catch (error) {
      console.error("Error getting books: ", book);
      toast.error("Failed to fetch book details. Please try again later.");
    }
  };

  // addding book to favourite
  const addToFavourite = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${api}/user/add-To-favourite/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error();
      toast.error(
        error.response?.data?.message || "Failed to add book to favourites"
      );
    }
  };

  // add to cart
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${api}/user/add-To-cart/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error getting book: ", error);
      toast.error(
        error.response?.data?.message || "Failed to add book to cart"
      );
    }
  };

  // edit book
  const editBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${api}/admin/book/update-book/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {}
  };

  // delete book
  const deleteBook = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${api}/admin/book/delete-book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      navigate("/all-books");
      // console.log(response);
    } catch (error) {
      console.error("Error deleting book: ", error);
      toast.error(error.response?.data?.message || "Failed to delete book");
    }
  };

  useEffect(() => {
    getBookDetail();
  }, [id]);

  return (
    <>
      {book && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8  ">
          <div className="  w-full lg:w-3/6 ">
            <div className=" flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded ">
              <img
                src={book.url}
                alt="/"
                className=" h-[50vh] md:h-[60vh] lg:h-[70vh] rounded "
              />

              {/* if is loggedin and is user then show the add to fav and cart  */}
              {isLoggedIn === true && role === "user" && (
                <div className="flex flex-col md:flex-row lg:flex-col  items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button
                    className="bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex justify-center items-center "
                    onClick={addToFavourite}
                  >
                    <FaHeart />
                    <span className="ms-4 lg:hidden block ">Favourites</span>
                  </button>
                  <button
                    className="text-white rounded mt-8 md:mt0 lg:rounded-full text-4xl lg:text-3xl p-3  lg:mt-8 bg-blue-500 flex justify-center items-center"
                    onClick={addToCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 lg:hidden block ">Add to cart</span>
                  </button>
                </div>
              )}

              {/* if is logged in and is admin then update the book  */}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col  items-center justify-between lg:justify-start mt-8 lg:mt-0">
                  <button className="bg-white rounded mt-8 md:mt0 lg:rounded-full text-4xl lg:text-3xl p-3 flex justify-center items-center">
                    <FaEdit />
                    <span className="ms-4 lg:hidden block ">Edit</span>
                  </button>
                  <button
                    className="text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-4 lg:mt-8 bg-white flex justify-center items-center"
                    onClick={deleteBook}
                  >
                    <MdOutlineDeleteOutline />
                    <span className="ms-4 lg:hidden block ">Delete book</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {book.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {book.author}</p>
            <p className="text-zinc-500 mt-4 text-xl">{book.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {book.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {book.price}
            </p>
          </div>
        </div>
      )}
      {!book && (
        <div className=" h-screen flex items-center justify-center bg-zinc-900">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
