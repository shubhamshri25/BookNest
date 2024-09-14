import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();

  //   console.log(id);

  const [book, setBook] = useState("");

  const api = `${import.meta.env.VITE_BACKEND_API}`;

  const getBookDetail = async () => {
    try {
      const response = await axios.get(`${api}/books/book-by-id/${id}`);
      console.log(response.data.book);
      setBook(response.data.book);
    } catch (error) {
      console.error("Error getting books: ", book);
    }
  };

  useEffect(() => {
    getBookDetail();
  }, [id]);

  return (
    <>
      {book && (
        <div className="px-8 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8  ">
          <div className="bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center ">
            <img
              src={book.url}
              alt="/"
              className=" h-[50vh] lg:h-[70vh] rounded"
            />
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
